'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

const tableName = process.env.BIO_TABLE;
const bucketName = process.env.BIO_IMAGES;

exports.editBio = async (event, context, callback) => {
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };
    let statusCode = 200;

    const data = JSON.parse(event.body);
    console.log("EVENT:::PreToken", data);
    const token = event.headers['Authorization'];
    const idToken = readToken(token);
    const sub = idToken.sub;
    console.log("SUB of user edit:", sub);
    console.log("EVENT:::", data);

    const mainImagePath = await uploadMainImageToS3(data.mainImage, 'mainImage', event.pathParameters.id);
    const optionalImagePath1 = await uploadImageToS3(data.optionalImage1, 'optionalImage1', event.pathParameters.id);
    const optionalImagePath2 = await uploadImageToS3(data.optionalImage2, 'optionalImage2', event.pathParameters.id);

    const getParams = {
        TableName: tableName,
        Key: {
            id: event.pathParameters.id
        },
    }

    if(!token || sub != event.pathParameters.id){
        console.log('Attempt to edit bio without proper id detected');
        callback(null, {
            statusCode: 401,
            headers,
            body: JSON.stringify({message: 'You lack Authorization to update bio'})
        });
    }

    let previousData;

    try {
        const result = await dynamoDb.get(getParams).promise();
        previousData = result.Item;
    } catch (error) {
        console.error('Error retrieving data from DynamoDB:', error);
    }

    //create new timestamp value
    let d = new Date();
    let h = addZero(d.getHours());
    let m = addZero(d.getMinutes());
    let ts = h + ':' + m;
    //create new date value
    let MM = addZero(d.getMonth()+1);
    let dd = addZero(d.getDate());
    let y = d.getFullYear();
    let dt = y + '/' + MM + '/' + dd;

    const editData = {
        id: event.pathParameters.id,
        lastEditDate: dt,
        lastEditTimestamp: ts,
        techStack: data.techStack,
        mainImage: mainImagePath,
        optionalImage1: optionalImagePath1,
        optionalImage2: optionalImagePath2,
        caption1: data.caption1,
        caption2: data.caption2,
        caption3: data.caption3
    };

    
    var fullName = data.fullName;
    var jobTitle = data.jobTitle;
    var description = data.description;
    var newData = { ...editData };

    if (data.fullName != "" && data.fullName != null) {
        newData = { ...newData, fullName };
    }

    if (data.jobTitle != "" && data.jobTitle != null) {
        newData = { ...newData, jobTitle };
    }
    
    if (data.description != "" && data.description != null) {
        newData = { ...newData, description };
    }

    const updatedData = { ...previousData, ...newData };

    const params = {
        TableName: tableName,
        Item: updatedData,
    };

    console.log("Updating Bio");

    try{
        await dynamoDb.put(params).promise()
            .then(res => {
                callback(null, {
                    statusCode,
                    headers,
                    body: JSON.stringify({message: 'Updated Bio Successfully!'})
                });
            }).catch(err => {
                console.log(err);
                callback(null, {
                    statusCode: 500,
                    headers,
                    body: JSON.stringify({message: 'Unable to Update Bio'})
                });
            });
    } catch (err) {
        return { error: err }
    }
};

async function uploadMainImageToS3(imageData, imageName, userId) {
    if (!imageData || imageData == '') {
        const placeholderImageKey = 'placeholder.png';
        const placeholderParams = {
            Bucket: bucketName,
            Key: placeholderImageKey,
        };

        await s3.headObject(placeholderParams).promise();

        return `https://${bucketName}.s3.amazonaws.com/${placeholderImageKey}`;
    }

    const decodedImage = Buffer.from(imageData, 'base64');
    const contentType = 'image/jpg';
    const s3Key = `${userId}/${imageName}.jpg`;

    const params = {
        Bucket: bucketName,
        Key: s3Key,
        Body: decodedImage,
        ContentType: contentType,
    };

    await s3.upload(params).promise();

    return s3Key;
}

async function uploadImageToS3(imageData, imageName, userId) {
    if (!imageData || imageData == '') {
        
        return null;
    }

    const decodedImage = Buffer.from(imageData, 'base64');
    const contentType = 'image/jpg';
    const s3Key = `${userId}/${imageName}.jpg`;

    const params = {
        Bucket: bucketName,
        Key: s3Key,
        Body: decodedImage,
        ContentType: contentType,
    };

    await s3.upload(params).promise();

    return s3Key;
}


function addZero(i) {
    if (i<10) {
        i = '0' + i;
    }
    return i;
}

function readToken(token){
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64'). toString());
}
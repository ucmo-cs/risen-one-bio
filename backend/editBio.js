'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

exports.editBio = async (event, context, callback) => {
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };
    let statusCode = 200;

    const data = JSON.parse(event.body);
    console.log("EVENT:::", data);

    const getParams = {
        TableName: process.env.BIO_TABLE,
        Key: {
            id: data.id
        },
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
        id: data.id,
        lastEditDate: dt,
        lastEditTimestamp: ts
    };

    
    var firstName = data.firstName;
    var lastName = data.lastName;
    var jobTitle = data.jobTitle;
    var description = data.description;
    var newData = { ...editData };

    if (data.firstName != "" && data.firstName != null) {
        newData = { ...newData, firstName };
    }

    if (data.lastName != "" && data.lastName != null) {
        newData = { ...newData, lastName };
    }

    if (data.jobTitle != "" && data.jobTitle != null) {
        newData = { ...newData, jobTitle };
    }
    
    if (data.description != "" && data.description != null) {
        newData = { ...newData, description };
    }

    const updatedData = { ...previousData, ...newData };

    const params = {
        TableName: process.env.BIO_TABLE,
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


function addZero(i) {
    if (i<10) {
        i = '0' + i;
    }
    return i;
}
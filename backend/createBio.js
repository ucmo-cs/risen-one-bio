'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
const uuid = require('uuid');

exports.createBio = async (event, context, callback) => {
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };
    let statusCode = 200;

    const data = JSON.parse(event.body);
    console.log("EVENT:::", data);
    const defaultPath = "/placeholder_image.png"
    const token = event.headers['Authorization'];
    const decodedToken = readToken(token);
    const sub = decodedToken.sub;

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

    const params = {
        TableName: process.env.BIO_TABLE,
        Item: {
            //id: uuid.v1(),
            id: sub,
            fullName: data.fullName,
            jobTitle: data.jobTitle,
            description: data.description,
            mainImage: defaultPath,
            createdDate: dt,
            createdTimestamp: ts
        }
    }

    console.log("Creating Bio");

    try{
        await dynamoDb.put(params).promise()
            .then(res => {
                callback(null, {
                    statusCode,
                    headers,
                    body: JSON.stringify({message: 'Created Bio Successfully!'})
                });
            }).catch(err => {
                console.log(err);
                callback(null, {
                    statusCode: 500,
                    headers,
                    body: JSON.stringify({message: 'Unable to Create Bio'})
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

function readToken(token){
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64'). toString());
}
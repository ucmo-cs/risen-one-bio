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

    //Currently unnecessary, but here in case of planned automation
    // const token = event.headers['Authorization'];
    // const decodedToken = readToken(token);
    // const sub = decodedToken.sub;

    const defaultPath = "placeholder.png"


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
            id: data.id,
            fullName: data.fullName,
            jobTitle: data.jobTitle,
            description: data.description,
            mainImage: defaultPath,
            optionalImage1: defaultPath,
            optionalImage2: defaultPath,
            caption1: '',
            caption2: '',
            caption3: '',
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

//currently uneccessary but here in case of planned automation
// function readToken(token){
//     return JSON.parse(Buffer.from(token.split('.')[1], 'base64'). toString());
// }


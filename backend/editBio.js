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

    const id = data.id;
    const firstName = data.firstName;
    const lastName = data.lastName;
    const jobTitle = data.jobTitle;
    const description = data.description;

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
            id: id,
            firstName: firstName,
            lastName: lastName,
            jobTitle: jobTitle,
            description: description,
            lastEditDate: dt,
            lastEditTimestamp: ts
        }
    }

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
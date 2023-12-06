'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

const bioTable = process.env.BIO_TABLE;
const bucketName = process.env.BIO_IMAGES;

exports.getBios = async (event, context) => {
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };
    let statusCode = 200;

    const token = event.headers.authorization;
    console.log(token);
    
    

    console.log("EVENT:::", JSON.stringify(event));

    try {

        const params = {
            TableName: bioTable,
        };

        console.log("Getting Item from table:::", bioTable);

        const data = await dynamoDb.scan(params).promise();

        console.log("Items received from table:::", bioTable);

        
      

        const response = {
            statusCode,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'isAccount': true
            },
            body: JSON.stringify(data.Items)
        };
        return response;

    } catch (error) {
        console.error('Error:', error);

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
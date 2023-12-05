'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const bioTable = process.env.BIO_TABLE;

exports.getBio = async (event, context) => {
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };
    let statusCode = 200;

    const token = event.headers['Authorization'];

    console.log("EVENT:::", JSON.stringify(event));

    try {
        const id = event.pathParameters.id;

        if (!id) {
            throw new Error('Missing required path parameter: id');
        }

        const params = {
            TableName: bioTable,
            Key: {
                'id': id,
            }
        };

        console.log("Getting Item from table:::", bioTable);

        const data = await dynamoDb.get(params).promise();

        const response = {
            statusCode,
            headers,
            body: JSON.stringify(data.Item)
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
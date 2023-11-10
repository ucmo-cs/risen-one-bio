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

    console.log("EVENT:::", JSON.stringify(event));

    const modelName = event.pathParameters.model; // Fix variable name
    const id = event.pathParameters.id;
    let table;
    switch (modelName) { // Fix variable name
        case "bio":
            table = bioTable;
            break;
        default:
            throw new Error(`Unsupported resource: "${modelName}"`);
    }

    const params = {
        TableName: table,
        Key: {
            'id': id,
        }
    };

    console.log("Getting Items from table:::", table);

    try {
        const data = await dynamoDb.get(params).promise(); // Use async/await for better readability

        const response = {
            statusCode,
            headers,
            body: JSON.stringify(data.Item)
        };

        return response;
    } catch (error) {
        console.log('Get failed. Error JSON:', JSON.stringify(error, null, 2));
        return {
            statusCode: error.statusCode || 500,
            headers,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

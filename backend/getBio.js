'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

const bioTable = process.env.BIO_TABLE;
const bioImages = process.env.BIO_IMAGES;

exports.getBio = async (event, context) => {
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };
    let statusCode = 200;

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

        var data = await dynamoDb.get(params).promise();

        //Here's where we need to get the S3 bucket images
        data.mainImage = getS3Image(data.mainImage);
        data.optionalImage1 = getS3Image(data.optionalImage1);
        data.optionalImage2 = getS3Image(data.optionalImage2);



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

    async function getS3Image(pathToImage) {

        const params = {
            Bucket: bucketName,
            Key: s3Key,
        };

        const s3image = await s3.getObject(params).promise();
        const base64Image = Buffer.from(s3image).toString('base64');

        return base64Image;
    }
};
'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

const bioTable = process.env.BIO_TABLE;
const bucketName = process.env.BIO_IMAGES;

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

        console.log("Items received from table:::", bioTable);

        const getImageFromS3 = async (path) => {
            const s3Params = {
                Bucket: bucketName,
                Key: path,
            };

            const s3Data = await s3.getObject(s3Params).promise();
            const base64Image = s3Data.Body.toString('base64');
            return base64Image;
        };

        if (data.Item) {
            const mainImage = await getImageFromS3(data.Item.mainImage);
            const optionalImage1 = await getImageFromS3(data.Item.optionalImage1);
            const optionalImage2 = await getImageFromS3(data.Item.optionalImage2);

            data.Item.mainImage = mainImage;
            data.Item.optionalImage1 = optionalImage1;
            data.Item.optionalImage2 = optionalImage2;
        }

        if (token) {
            const decodedToken = readToken(token);
            const sub = decodedToken.sub;
      
            if(sub == id){
                const response = {
                    statusCode,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'isAccount': true
                    },
                    body: JSON.stringify(data.Item)
                };
                return response;
            }
        }

        
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

function readToken(token){
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
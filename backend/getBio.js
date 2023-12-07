'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

//set environment variables
const bioTable = process.env.BIO_TABLE;
const bucketName = process.env.BIO_IMAGES;

exports.getBio = async (event, context) => {
    //cross-origin request header
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };
    let statusCode = 200;

    //get auth token
    const token = event.headers.authorization;
    console.log(token);
    
    

    console.log("EVENT:::", JSON.stringify(event));

    //get id and retrieve data from DynamoDB
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

        //get images from S3 and convert them
        const getImageFromS3 = async (path) => {
            if (path === "placeholder.png" || path === null || path === '' || path === undefined) {
                console.log("Placeholder Image does not allow for requesting");
                return "";
            }
            const s3Params = {
                Bucket: bucketName,
                Key: path,
            };
            console.log("Getting Item from S3 ::: ", path);
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

            console.log(':::', sub);
      
            if(sub == id){
                data.Item.isAccount = true;
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

function readToken(token){  //this function takes the JWT token and decodes the body section
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

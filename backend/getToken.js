const AWS = require('aws-sdk');
const axios = require('axios');
const Buffer = require("buffer");

const COGNITO_CLIENT_ID = '4fqh40acgmdksdok6l50qp8l21';
const COGNITO_CLIENT_SECRET = '1h49tj8fm3q22vg5qi2cqfjfr8sihqsuulef79nvm4c92dlmquko';
const COGNITO_USERPOOL_ID = 'us-east-1_dAEa5zSQ8';
const REDIRECT_URL = 'localhost:4200/get-token';

exports.getToken = async (event) => {
    const code = event.headers['code'];
    const tokenEndpoint = 'https://riseonebiologin.auth.us-east-1.amazoncognito.com/oauth2/token';

    const params = {
        grant_type: 'authorization code',
        client_id: COGNITO_CLIENT_ID,
        code: code,
        redirect_uri: REDIRECT_URL
    };

    // var encoded = btoa(COGNITO_CLIENT_ID + ':' + COGNITO_CLIENT_SECRET);

    const encoded = Buffer.from(COGNITO_CLIENT_ID + ':' + COGNITO_CLIENT_SECRET).toString('base64');

    const tokenRequestHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: encoded
    };

    try{
        const response = await axios.post(tokenEndpoint, params, {headers: tokenRequestHeaders});
        const tokens = response.data;

        //to get something useful from this
        const idToken = tokens.id_token;
        const userData = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString());

        return{
            statusCode: 200,
            Headers: {
                "Authorization": idToken
            },
            body: JSON.stringify(tokens)
        };
    } catch (error){
        console.error("Error exchanging code for tokens:", error);
        return{
            statusCode: 500,
            body: JSON.stringify({error: 'InternalServerError'}),
        };
    }
}

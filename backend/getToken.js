const AWS = require('aws-sdk');
const axios = require('axios');

const COGNITO_CLIENT_ID = '4fqh40acgmdksdok6l50qp8l21';
const COGNITO_CLIENT_SECRET = '1h49tj8fm3q22vg5qi2cqfjfr8sihqsuulef79nvm4c92dlmquko';
const COGNITO_USERPOOL_ID = 'us-east-1_dAEa5zSQ8';
const REDIRECT_URL = 'http://localhost:4200/get-token';

exports.getToken = async (event) => {
    //get code from header
    const code = event.headers['code'];
    //endpoint set to the cognito token endpoint
    const tokenEndpoint = 'https://riseonebiologin.auth.us-east-1.amazoncognito.com/oauth2/token';

    //parameters for the endpoint
    const params = {
        grant_type: 'authorization_code',
        client_id: COGNITO_CLIENT_ID,
        code: code,
        redirect_uri: REDIRECT_URL
    };

    //base64encode for the authorization
    const encoded = Buffer.from(COGNITO_CLIENT_ID + ':' + COGNITO_CLIENT_SECRET).toString('base64');

    //set the headers
    const tokenRequestHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${encoded}`
    };

    try{

        //uses axios inorder to send the code and info to the endpoint and recieves the JWT tokens in a JSON
        console.log(tokenEndpoint, ':::', params, ':::', {headers: tokenRequestHeaders});
        const response = await axios.post(tokenEndpoint, new URLSearchParams(params), {headers: tokenRequestHeaders});
        console.log(response);
        const tokens = response.data;
        console.log(tokens);

        //to get something useful from this
        const idToken = tokens.id_token;
        console.log(idToken);
        const userData = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString());   //splits the id token into its 3 components then decodes the body section
        console.log(userData);
        //do at every location where you want the data of the tokens

        return{
            statusCode: 200,
            Headers: {
                'Authorization': idToken    //returns the idtoken in the header
            },
            body: JSON.stringify(tokens)    //returns all tokens in the body. This is primarily for redundancy
        };
    } catch (error){
        console.error("Error exchanging code for tokens:", error);
        return{
            statusCode: 500,
            body: JSON.stringify({error: 'InternalServerError'}),
        };
    }
}

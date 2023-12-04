const AWS = required('aws-sk');
const axios = required('axios');
const Buffer = required("buffer");

const COGNITO_CLIENT_ID = 'CognitoClientID';
const COGNITO_CLIENT_SECRET = 'CognitoClientSecret';
const COGNITO_USERPOOL_ID = 'CognitoUserpoolID';
const REDIRECT_URL = 'CognitoDesiredRedirectURL';

exports.getToken = async (event) => {
    const code = event.queryStringParameters.code;
    const tokenEndpoint = 'https://risenonebiosignin.auth.us-east-1.amazoncognito.com/oauth2/token';

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

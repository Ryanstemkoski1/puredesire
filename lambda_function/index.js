var AWS = require('aws-sdk/dist/aws-sdk-react-native');
var myCredentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId:'us-west-2:1c2784c6-c017-4385-9c87-cb7e1a38df8f'
});
var myConfig = new AWS.Config({
    // credentials: myCredentials,
    accessKeyId: '105405504930-hgahl3tdhi7q939rhjm5j0vev8ugffn2.apps.googleusercontent.com',
    accessSecretKey: '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',
    region: 'us-west-2',
    apiVersion: 'latest'
});
AWS.config = myConfig;

const cognitoIdp = new AWS.CognitoIdentityServiceProvider()
const getUserByEmail = async (userPoolId, email) => {
    const params = {
        UserPoolId: userPoolId,
        Filter: `email = "${email}"`
    }
    return cognitoIdp.listUsers(params).promise()
}

const linkProviderToUser = async (username, userPoolId, providerName, providerUserId) => {
    const params = {
        DestinationUser: {
            ProviderAttributeValue: username,
            ProviderName: 'Cognito'
        },
        SourceUser: {
            ProviderAttributeName: 'Cognito_Subject',
            ProviderAttributeValue: providerUserId,
            ProviderName: providerName
        },
        UserPoolId: userPoolId
    }

    const result = await (new Promise((resolve, reject) => {
        cognitoIdp.adminLinkProviderForUser(params, (err, data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(data)
        })
    }))

    return result
}

exports.handler = async (event, context, callback) => {
    if (event.triggerSource === 'PreSignUp_ExternalProvider') {
        const userRs = await getUserByEmail(event.userPoolId, event.request.userAttributes.email)
        if (userRs && userRs.Users.length > 0) {
            const [ providerName, providerUserId ] = event.userName.split('_') // event userName example: "Facebook_12324325436"
            await linkProviderToUser(userRs.Users[0].Username, event.userPoolId, providerName, providerUserId)
        } else {
            console.log('user not found, skip.')
        }

    }
    return callback(null, event)
}
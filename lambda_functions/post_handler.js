const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: "ap-northeast-2"});

exports.handler = (event, context, callback) => {
    console.log("Processing...");
    console.log(event);
    const params = {
        Item: {
            noteid: "12345",
            date: Date.now(),
            title : event.key1,
            content: event.key2
        },
        TableName: "advanced_note_app"
    };
    const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify('Hello from new Lambda!'),
    };

    context.succeed(response);

    docClient.put(params, function(err, data) {
        if(err){
            callback(err, null);
        } else {
            callback(null, data);
        }
    })

};

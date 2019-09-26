const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: "ap-northeast-2"});

exports.handler = (event, context, callback) => {
    console.log("Processing...");


    const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify('Hello from new Lambda!'),
    };


    // pk of data is stored in URL path
    let noteid = event.pathParameters.id;
    console.log(noteid);


    var params = {
        TableName:"advanced_note_app",
        Key:{
            noteid : noteid
        },
        ConditionExpression:"noteid = :noteid",
        ExpressionAttributeValues: {
            ":noteid": noteid
        }
    };

    console.log("Attempting a conditional delete...");
    docClient.delete(params, function(err, data) {
        if(err){
            //callback(err, null);
            console.log(err);
        } else {
            console.log("succeed");
            //callback(null, data);

        }
        callback(null, response);
    })

};

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: "ap-northeast-2"});

exports.handler = (event, context, callback) => {
    console.log("Processing...");



    let response = {
      statusCode: 200,
      headers: {
        "x-custom-header": "my custom header value",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        message: 'Your function executed successfully!',
      }),
    };

    // data is stored in Body
    let data = JSON.parse(event.body);

    // pk of data is stored in URL path
    let noteid = event.pathParameters.id;


    var params = {
        TableName: "advanced_note_app",
        Key:{
            noteid : noteid
        },
        UpdateExpression: "set title = :t, content =:c, do_type =:dt",
        ExpressionAttributeValues:{
            ":t": data.title,
            ":c": data.content,
            ":dt": data.type
        },
        ReturnValues:"UPDATED_NEW"
    };



    docClient.update(params, function(err, data) {
        if(err){
            callback(err, null);
        } else {
            //callback(null, data);
            callback(null, response);
        }
    })

};


const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: "ap-northeast-2"});

/* GET 메서드
  .../notes
  .../notes/{id}
*/
exports.handler = (event, context, callback) => {
    console.log("Processing...");

    // Parse resource note id
    // 참고 : https://stackoverflow.com/questions/55854824/event-object-is-empty-in-aws-lambda-nodejs-function
    // lamdba의 매개변수인 event에 유저의 요청이 api gateway로부터 그대로 넘어오게 하기 위하여
    // Lambda Proxy Integration should be enabled해야 한다.

    // notes 요청 시 event는 null이다.
    // notes/{id} 요청 시 event 는 not null이다.

    console.log(event);
    // Make a query params
    var table = "advanced_note_app";

    try{
      var query_type = event.queryStringParameters.type;
    }catch(err){
      query_type = null;
    }


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

    // Handle GET all notes
    if(query_type != null){

      var params = {
          TableName: table,
          FilterExpression: '#do_type = :params',
          ExpressionAttributeNames: {
              '#do_type': 'do_type',
          },
          ExpressionAttributeValues: {
              ':params': query_type,
          },
      };

      docClient.scan(params, function(err, data){
        if (err) {
          console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
          response.body = JSON.stringify({result : "Failed"});

          callback(null, response);
      } else {
          console.log("Succeed");
          response.body = JSON.stringify({result : data});

          callback(null, response);
        }
      });

    // Handle Get a single note
    }else{
      console.log("else called");
      var noteid = (event.pathParameters.id).toString();
      var params = {
        TableName: table,
        Key: {
          noteid: noteid
        }
      };


      docClient.get(params, function(err, data) {
        if (err) {
          response.statusCode = 500;
          response.body = JSON.stringify({result : err});
          callback(null, response);

        } else {
          response.body = JSON.stringify({result : data});
          // Response to Client when async get operation is done...
          callback(null, response);
        }
      });
    }

};

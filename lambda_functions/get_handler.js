const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: "ap-northeast-2"});

/* GET 메서드 처리 함수
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
    console.log(event.pathParameters);
    console.log(event.httpMethod);
    console.log('event: ', JSON.stringify(event));
    console.log('context: ', JSON.stringify(context));
    var table = "advanced_note_app";

    var noteid = "12345";

    var params = {
      TableName: table,
      Key: {
        noteid: noteid
      }
    };
    var res;
    const response = {
      statusCode: 200,
      headers: {
        "x-custom-header": "my custom header value"
      },
      body: JSON.stringify({
        message: 'Your function executed successfully!',
        input: event,
      }),
    };

    docClient.get(params, function(err, data) {
      if (err) {
        console.error(
          "Unable to read item. Error JSON:",
          JSON.stringify(err, null, 2)
        );
      } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        res = JSON.stringify(data, null, 2);
        console.log("res : "+ res);

        // Response to Client when async get operation is done...
        //context.succeed(res);
        callback(null, response);
      }
    });

    //context.succeed(res);

};

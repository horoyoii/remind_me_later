const AWS = require('aws-sdk');
const uuid = require ("uuid/v4");
const docClient = new AWS.DynamoDB.DocumentClient({region: "ap-northeast-2"});

exports.handler = (event, context, callback) => {
    console.log("Processing...");
    /* Primary Key의 경우 auto increment가 좋지만
        클라이언트 단에서 Public하게 접근할 수 있다면
        PK가 노출되기에 예측 가능 모델이 되어버려서 크롤링이나 인젝션 공격에 취약해진다.
        https://medium.com/aha-official/%EC%95%84%ED%95%98-rest-api-%EC%84%9C%EB%B2%84-%EA%B0%9C%EB%B0%9C-6-43568d94878a
    */

    let m_uuid = uuid();
    m_uuid = m_uuid.replace(/-/g, '');

    const params = {
        Item: {
            noteid: m_uuid,
            date: Date.now(),
            title : event.title,
            content: event.content,
            do_type : event.type,
        },
        TableName: "advanced_note_app"
    };

    // CORS을 허용하기 위하여 response header 내의 Access-Control-Allow 옵션이 필요하다.
    const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: '',
    };

    docClient.put(params, function(err, data) {
        if(err){
            response.body = JSON.stringify("Error");
            callback(err, response);
        } else {
            response.body = JSON.stringify(params.Item.noteid);
            callback(null, response);
        }
    })

};

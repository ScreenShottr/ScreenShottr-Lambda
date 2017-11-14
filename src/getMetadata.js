'use strict'
const aws = require('aws-sdk')
const dynamo = new aws.DynamoDB.DocumentClient()

module.exports.getMetadata = (event, context, callback) => {
  const image_id = event.queryStringParameters.image_id
  let response = {}

  const dynamoParams = {
    TableName: 'screenshottr-service-uploads',
    Key: {
      'image_id': image_id
    }
  }

  dynamo.get(dynamoParams, function(error, data) {
    if (error) {
      response = {
        statusCode: 500,
        body: JSON.stringify({
          success: false
        })
      }
      console.log(error)
    } else {
      response = {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          response: {
            data
          }
        })
      }
    }
    callback(null, response)
  })

}

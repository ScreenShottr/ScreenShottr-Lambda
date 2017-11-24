'use strict'
console.log('Loading function')

const uuidv4 = require('uuid/v4')
const aws = require('aws-sdk')
const s3 = new aws.S3()
const dynamo = new aws.DynamoDB.DocumentClient()

module.exports.getSignedS3URL = (event, context, callback) => {
  let imageOwner
  if (event.queryStringParameters && event.queryStringParameters.user_name && event.queryStringParameters.token) {
    const dynamoParams = {
      TableName: `screenshottr-service-user-${process.env.SS_STAGE}`,
      Key: {
        'user_name': event.queryStringParameters.user_name
      }
    }

    dynamo.get(dynamoParams, function (error, data) {
      if (error) {
        console.log(error)
      } else {
        if (data.Item.token && data.Item.token === event.queryStringParameters.token) {
          imageOwner = event.queryStringParameters.user_name
        } else {
          imageOwner = '0'
        }
      }
    })
  } else {
    imageOwner = '0'
  }
  const key = uuidv4()
  const S3params = {
    Bucket: `screenshottr-service-images-unprocessed-${process.env.SS_STAGE}`,
    Key: key,
    ACL: 'public-read',
    Expires: 250,
    ContentType: 'binary/octet-stream'
  }
  const dynamoParams = {
    TableName: `screenshottr-service-uploads-${process.env.SS_STAGE}`,
    Item: {
      image_id: key,
      image_status: 'not_yet_uploaded',
      dates: {
        created: Date.now()
      },
      deleted: false,
      image_owner: imageOwner
    }
  }
  console.log('here')
  dynamo.put(dynamoParams, function (error, data) {
    if (error) {
      console.log(error)
    }
  })

  s3.getSignedUrl('putObject', S3params, function (error, url) {
    if (error) {
      const response = {
        statusCode: 500,
        body: JSON.stringify({
          success: false
        })
      }
      callback(null, response)
    } else {
      console.log('URL', url)
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          response: {
            signedUrl: url,
            key: key
          }
        })
      }
      callback(null, response)
    }
  })
}

'use strict';
const aws = require('aws-sdk')
const s3 = new aws.S3()
const uuidv4 = require('uuid/v4')
const querystring = require('querystring')

module.exports.uploadFile = (event, context, callback) => {
  const currentTime = Date.now()
  const filename = "thisFilename"
  const params = {
    Body: ,
    Bucket: 'screenshottr-service-images-unprocessed-dev',
    Key: uuidv4() + '.png',
    ACL: 'public-read',
    Tagging: `uploadTime=${currentTime}&filename=${filename}`
  }

  s3.putObject(params, function(err, data) {
    let response
    if (err) {
      response = {
        statusCode: 500,
        body: JSON.stringify({
          message: 'Internal Server Error'
        })
      }
    } else {
      response = {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          response: {
            fileUrl: "URL HERE"
          }
        })
      }
    }
    callback(null, response);
  })


  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

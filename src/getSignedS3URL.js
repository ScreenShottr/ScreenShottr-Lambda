'use strict'
console.log('Loading function')

const uuidv4 = require('uuid/v4')
const aws = require('aws-sdk')
const s3 = new aws.S3()

module.exports.getSignedS3URL = (event, context, callback) => {
  var params = {
    Bucket: 'screenshottr-service-images-unprocessed-dev',
    Key: uuidv4(),
    ACL: 'public-read',
    Expires: 250
  }

  s3.getSignedUrl('putObject', params, function (error, url) {
    if (error) {
      const response = {
        statusCode: 500,
        body: JSON.stringify({
          message: error
        })
      }
     callback(null, response)
    } else {
      console.log("URL", url)
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          response: {
            signedUrl: url
          }
        })
      }
      callback(null, response)
    }
  })
}

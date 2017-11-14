'use strict'

const uuidv4 = require('uuid/v4')

console.log('Loading function')

const aws = require('aws-sdk')
const s3 = new aws.S3()

module.exports.getSignedS3URL = (event, context, callback) => {
  const key = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8)
    return v.toString(16)
  })

  var params = {
    Bucket: 'screenshottr-service-images-unprocessed-dev',
    Key: key,
    AL: 'public-read',
      Expires: 250
  }

  s3.getSignedUrl('putObject', params, function (err, url) {
    if (error) {
      response = {
        statusCode: 500,
        body: JSON.stringify({
          message: error
        })
      }
     callback(err)
    } else {
      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: url
        })
      }
      callback(null, { url })
    }
  })
}

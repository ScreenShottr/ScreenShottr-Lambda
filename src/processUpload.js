'use strict';
const _ = require('lodash')
const imageType = require('image-type')
const aws = require('aws-sdk')
const s3 = new aws.S3()

module.exports.processUpload = (event, context, callback) => {

  _.map(event.Records, (event) => {
    console.log(event.s3.bucket.name)
    console.log(event.s3.object.key)
    const params = {
      Bucket: event.s3.bucket.name,
      Key: event.s3.object.key
    }

    if (event.s3.object.size > 10485760) {
      console.log(`Deleting ${event.s3.object.key}`)
      s3.deleteObject(params, (err, data) => {
        if (err) {
          console.log(err)
          callback(null, {})
        } else {
          console.log(`Deleted ${event.s3.object.key}`)
        }
      })
      callback(null, {})
    } else {
      let image
      await s3.getObject(params, (err, data) => {
        if (err) {
          console.log(err)
          callback(null, {})
        } else {
          image = data.body()
        }
      })
      imageMeta = imageType(image)
      console.log(imageMeta)
    }
  })

  callback(null, {})
}

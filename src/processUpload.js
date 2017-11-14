'use strict';
const _ = require('lodash')
const fileType = require('file-type')
const aws = require('aws-sdk')
const s3 = new aws.S3()

module.exports.processUpload = (event, context, callback) => {

  _.map(event.Records, (event) => {
    let filename = ''
    let mimeType = ''
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
      s3.getObject(params, (err, data) => {
        if (err) {
          console.log(err)
          callback(null, {})
        } else {
          const image = data.Body
          const fileMeta = fileType(image)
          const fileExtensions = ["png", "jpg", "jpeg", "svg", "gif", "tiff"]
          if (fileExtensions.indexOf(fileMeta.ext) > -1) {
            filename = `${event.s3.object.key}.${fileMeta.ext}`
            mimeType = fileMeta.mime
            const putParams = {
              Body: image,
              Bucket: 'screenshottr-service-images-saved-dev',
              Key: filename,
              ContentType: mimeType,
              ACL: 'public-read'
            }
            // Process the image here
            s3.putObject(putParams, (err, data) => {
              if (err) {
                console.log(err)
                callback(null, {})
              } else {
                console.log(`PUT ${event.s3.object.key}`)
              }
            })

          }
          s3.deleteObject(params, (err, data) => {
            if (err) {
              console.log(err)
              callback(null, {})
            } else {
              console.log(`Deleted ${event.s3.object.key}`)
            }
          })
        }
      })
    }
  })

  callback(null, {})
}

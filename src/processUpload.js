'use strict';
const _ = require('lodash')
const fileType = require('file-type')
const aws = require('aws-sdk')
const s3 = new aws.S3()
const dynamo = new aws.DynamoDB.DocumentClient()

module.exports.processUpload = (event, context, callback) => {

  _.map(event.Records, (event) => {
    let filename = ''
    let mimeType = ''
    const S3Params = {
      Bucket: event.s3.bucket.name,
      Key: event.s3.object.key
    }

    if (event.s3.object.size > 10485760) {
      console.log(`Deleting ${event.s3.object.key}`)
      s3.deleteObject(S3Params, (err, data) => {
        if (err) {
          console.log(err)
          callback(null, {})
        } else {
          console.log(`Deleted ${event.s3.object.key}`)
        }
      })
      callback(null, {})
    } else {
      s3.getObject(S3Params, (err, data) => {
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
              Bucket: 'screenshottr-service-images-saved',
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
                const dynamoParams = {
                  TableName: 'screenshottr-service-uploads',
                  Key: {
                    image_id: event.s3.object.key
                  },
                  UpdateExpression: "set dates.uploaded_at = :modifiedTime, image_url = :image_url, fileMeta = :fileMeta, filename = :filename, image_status = :image_status, image_owner = :image_owner",
                  ExpressionAttributeValues: {
                    ":modifiedTime": Date.now(),
                    ":image_url": `https://i.screenshottr.us/${filename}`,
                    ":fileMeta": fileMeta,
                    ":filename": filename,
                    ":image_status": 'image_uploaded',
                    ":image_owner": 0
                  }
                }
                dynamo.update(dynamoParams, function(error, data) {
                  if (error) {
                    console.log(error)
                  }
                })
                console.log(`PUT ${event.s3.object.key}`)
              }
            })

          }
          s3.deleteObject(S3Params, (err, data) => {
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

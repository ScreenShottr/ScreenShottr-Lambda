const S3 = require('../connect')
const handleResponse = require('../handle-response')

module.exports = ({Bucket, Key, ACL, Expires, ContentType}) =>
  new Promise((resolve, reject) => {
    const TableName = 'onyx-service-urls'

    S3.getSignedUrl('putObject', {
      Bucket,
      Key,
      ACL,
      Expires,
      ContentType
    }, handleResponse(resolve, reject))
  })

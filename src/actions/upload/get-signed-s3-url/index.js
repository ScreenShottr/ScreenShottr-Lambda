const qs = require('qs')
const respond = require('../../service/response/generate-response')
const getSignedURL = require('../../service/s3/getSignedUrl')
const uuidv4 = require('uuid/v4')

module.exports = (event, context, callback) =>
  new Promise(async (resolve, reject) => {
    const url = await getSignedURL({
      Bucket: 'screenshottr-service-uploads-dev',
      Key: uuidv4(),
      ACL: 'public-read',
      Expires: 250,
      ContentType: 'binary/octet-stream'
    })
    respond({statusCode: 200, Success: true, Content: url}, callback)
    resolve()
  })

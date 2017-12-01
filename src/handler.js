const getSignedS3URL = require('./actions/upload/get-signed-s3-url')
const processUpload = require('./actions/upload/process-image-upload')
const getImageMetadata = require('./actions/image/get-image-metadata')
const createUser = require('./actions/user/create-user')

// User

module.exports.createUser = (event, context, callback) => {
  createUser(event, context, callback)
}

// Image Upload

module.exports.getSignedS3URL = (event, context, callback) => {
  getSignedS3URL(event, context, callback)
}

module.exports.processUpload = (event, context, callback) => {
  processUpload(event, context, callback)
}

// Image Info

module.exports.getImageMetadata = (event, context, callback) => {
  getMetadata(event, context, callback)
}

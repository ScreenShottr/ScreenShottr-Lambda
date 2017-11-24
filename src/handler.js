const getSignedS3URL = require('./actions/getSignedS3URL')
const processUpload = require('./actions/processUpload')
const getMetadata = require('./actions/getMetadata')
const createUser = require('./actions/createUser')

module.exports.getSignedS3URL = (event, context, callback) => {
  getSignedS3URL(event, context, callback)
}

module.exports.processUpload = (event, context, callback) => {
  processUpload(event, context, callback)
}

module.exports.getMetadata = (event, context, callback) => {
  getMetadata(event, context, callback)
}

module.exports.createUser = (event, context, callback) => {
  createUser(event, context, callback)
}

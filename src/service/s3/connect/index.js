const AWS = require('aws-sdk')

module.exports = new AWS.S3({region: 'eu-west-2'})

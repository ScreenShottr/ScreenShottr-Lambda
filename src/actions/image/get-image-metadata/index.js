const respond = require('../../service/response/generate-response')

module.exports = (event, context, callback) =>
  new Promise(async (resolve, reject) => {
    respond({statusCode: 200, Success: true, Content: '.'}, callback)
    resolve()
  })

module.exports = ({statusCode, Success, Content}, callback) => {
  const response = {
    statusCode: statusCode,
    body: JSON.stringify({
      Success,
      response: Content
    })
  }

  callback(null, response)
}

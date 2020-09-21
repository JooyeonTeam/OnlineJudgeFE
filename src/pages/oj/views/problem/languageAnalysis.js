var openApiURL = 'http://aiopen.etri.re.kr:8000/WiseNLU_spoken'
var accessKey = '4d70a188-207c-4f1a-b370-5f27675c7d5e'
var analysisCode = 'morp'
var text = ''

function setText (text) {
  this.text = text
}

var statusCode = ''
var response = ''
var requestJson = {
  'access_key': accessKey,
  'argument': {
    'text': text,
    'analysis_code': analysisCode
  }
}
var request = require('request')
var options = {
  url: openApiURL,
  body: JSON.stringify(requestJson),
  headers: {'Content-Type': 'application/json; charset=UTF-8'}
}

request.post(options, function (error, response, body) {
  statusCode = response.statusCode
  response = body
  console.log(error.message)
})

export { response }

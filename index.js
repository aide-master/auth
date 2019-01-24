/* eslint-disable standard/no-callback-literal */

exports.handler = function (event, context, cb) {
  var token = event.authorizationToken
  switch (token.toLowerCase()) {
    case 'allow':
      cb(null, generatePolicy('user', 'Allow', event.methodArn))
      break
    case 'deny':
      cb(null, generatePolicy('user', 'Deny', event.methodArn))
      break
    case 'unauthorized':
      cb('Unauthorized') // Return a 401 Unauthorized response
      break
    default:
      cb('Error: Invalid token')
  }
}

// Help function to generate an IAM policy
var generatePolicy = function (principalId, effect, resource) {
  var authResponse = {}

  authResponse.principalId = principalId
  if (effect && resource) {
    var policyDocument = {}
    policyDocument.Version = '2012-10-17'
    policyDocument.Statement = []
    var statementOne = {}
    statementOne.Action = 'execute-api:Invoke'
    statementOne.Effect = effect
    statementOne.Resource = resource
    policyDocument.Statement[0] = statementOne
    authResponse.policyDocument = policyDocument
  }

  // Optional output with custom properties of the String, Number or Boolean type.
  authResponse.context = {
    'stringKey': 'stringval',
    'numberKey': 123,
    'booleanKey': true
  }
  return authResponse
}

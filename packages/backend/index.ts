/* eslint-disable standard/no-callback-literal */

// Help function to generate an IAM policy
const generatePolicy = function (principalId: any, effect: any, resource: any) {
  const authResponse: any = {}

  authResponse.principalId = principalId
  if (effect && resource) {
    const policyDocument: any = {}
    policyDocument.Version = '2012-10-17'
    policyDocument.Statement = []
    const statementOne: any = {}
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

export const handler = function (event: any, context: any, cb: any) {
  const token = event.authorizationToken || ''
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

export const test = function (event: any, context: any, cb: any) {
  cb(null, {
    statusCode: 200,
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ event, context })
  })
}
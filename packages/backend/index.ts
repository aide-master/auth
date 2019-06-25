/* eslint-disable standard/no-callback-literal */

import * as jwt from 'jsonwebtoken'

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
  try {
    const decoded: any = jwt.verify(token, process.env.jwtSecret || '')
    cb(null, generatePolicy(decoded.id, 'Allow', event.methodArn))
    // cb(null, generatePolicy('user', 'Deny', event.methodArn))
  } catch (error) {
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

export const generate = function (event: any, context: any, cb: any) {
  const id = event.queryStringParameters.id
  const expiresIn = event.queryStringParameters.validity || '1d'
  const accessToken = jwt.sign({ id }, process.env.jwtSecret || '', { expiresIn })
  cb(null, {
    statusCode: 200,
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ accessToken })
  })
}

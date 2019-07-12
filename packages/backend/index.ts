/* eslint-disable standard/no-callback-literal */

import * as Raven from 'raven'
import * as jwt from 'jsonwebtoken'
import * as github from './service/github'
import * as utils from './utils'
import { CustomAuthorizerResult, APIGatewayProxyHandler, CustomAuthorizerHandler } from 'aws-lambda'
import { init } from './db'
import * as UserHelper from './user'

const RavenLambdaWrapper = require('serverless-sentry-lib')

// Help function to generate an IAM policy
const generatePolicy = function (principalId: string, effect: string, resource: string | string[]): CustomAuthorizerResult {
  return {
    principalId,
    context: {
      // Optional output with custom properties of the String, Number or Boolean type.
      'stringKey': 'stringval',
      'numberKey': 123,
      'booleanKey': true
    },
    policyDocument: {
      Version: '2012-10-17',
      Statement: [{
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource
      }]
    }
  }
}

const _handler: CustomAuthorizerHandler = async event => {
  const token = event.authorizationToken || ''
  try {
    const decoded: any = jwt.verify(token, process.env.jwtSecret || '')
    return generatePolicy(decoded.id, 'Allow', event.methodArn)
  } catch (error) {
    return generatePolicy('', 'Deny', event.methodArn)
  }
}
export const handler = RavenLambdaWrapper.handler(Raven, _handler)

const _test: APIGatewayProxyHandler = async (event, context) => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ event, context })
  }
}

export const test = RavenLambdaWrapper.handler(Raven, _test)

const _generate: APIGatewayProxyHandler = async event => {
  const qs = event.queryStringParameters || {}
  const id = qs.id
  const expiresIn = qs.validity || '1d'
  const accessToken = jwt.sign({ id }, process.env.jwtSecret || '', { expiresIn })
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ accessToken })
  }
}
export const generate = RavenLambdaWrapper.handler(Raven, _generate)

const _githubAuth: APIGatewayProxyHandler = async event => {
  await init()
  const qs = utils.parseReqBody(event.body)
  const code = qs.code
  const state = qs.state
  const { token } = await github.getAccessToken(code, state)
  const userInfo = await github.getUserInfo(token)
  console.log('userInfo is: ', userInfo)
  const userId = await UserHelper.getUserIdByGithubUserInfo(userInfo)
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ userId })
  }
}

export const githubAuth = RavenLambdaWrapper.handler(Raven, _githubAuth)

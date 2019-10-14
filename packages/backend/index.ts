/* eslint-disable standard/no-callback-literal */

import * as Raven from 'raven'
import * as jwt from 'jsonwebtoken'
import * as github from './service/github'
import * as utils from './utils'
import { CustomAuthorizerResult, APIGatewayProxyHandler, CustomAuthorizerHandler } from 'aws-lambda'
import { init } from './db'
import * as UserHelper from './user'
import * as cookie from 'cookie'
import { ApiError } from './error'

import * as RavenLambdaWrapper from 'serverless-sentry-lib'

function wrap<T extends Function> (fn: T): T {
  return RavenLambdaWrapper.handler(Raven, async function (...args: any[]): Promise<any> {
    try {
      await init()
      const result = await fn(...args)
      return result
    } catch (error) {
      console.error(error)
      if (error instanceof ApiError) {
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code: error.code,
            msg: error.msg
          })
        }
      }
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ err: error.stack })
      }
    }
  }) as T
}

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

export const handler = wrap<CustomAuthorizerHandler>(async event => {
  const token = event.authorizationToken || ''
  try {
    const decoded: any = jwt.verify(token, process.env.jwtSecret || '')
    return generatePolicy(decoded.id, 'Allow', event.methodArn)
  } catch (error) {
    return generatePolicy('', 'Deny', event.methodArn)
  }
})

export const test = wrap<APIGatewayProxyHandler>(async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': cookie.serialize('hello', 'world', {
        domain: '.aidemaster.com'
      })
    },
    body: JSON.stringify({ event, context })
  }
})

export const generate = wrap<APIGatewayProxyHandler>(async event => {
  const qs = event.queryStringParameters || {}
  const id = qs.id
  const expiresIn = qs.validity || '1d'
  const accessToken = jwt.sign({ id }, process.env.jwtSecret || '', { expiresIn })
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accessToken })
  }
})

export const githubAuth = wrap<APIGatewayProxyHandler>(async event => {
  const qs = utils.parseReqBody(event.body)
  const code = qs.code
  const state = qs.state
  const { token } = await github.getAccessToken(code, state)
  const userInfo = await github.getUserInfo(token)
  const userId = await UserHelper.getUserIdByGithubUserInfo(userInfo)
  const expiresIn = '10d'
  const accessToken = jwt.sign({ id: userId }, process.env.jwtSecret || '', { expiresIn })
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': cookie.serialize('token', accessToken, {
        domain: '.aidemaster.com'
      })
    },
    body: JSON.stringify({ token: accessToken })
  }
})

export const profile = wrap<APIGatewayProxyHandler>(async (event) => {
  const authorizer = event.requestContext.authorizer
  if (!authorizer || !authorizer.principalId) {
    return {
      statusCode: 401,
      body: ''
    }
  }
  const userId = authorizer.principalId
  const userInfo = await UserHelper.getUserById(userId)
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo.profile)
  }
})

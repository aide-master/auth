import * as rest from '../common/rest'
import * as _ from 'lodash'
import * as utils from '../common/utils'

export const CLIENT_ID = 'd7932611c30ea08bd0c8'
export const REDIRECT_URI = 'https://auth.aidemaster.com/callback/github'
export const STATE = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
export const AUTH_LINK = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}`

export async function login (code: string, state: string) {
  const res = await rest.post('/api/github', { code, state })
  const token = _.get(res.data, 'token')
  utils.setCookie('token', token)
}

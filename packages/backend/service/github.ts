import axios from 'axios'
import * as FormData from 'form-data'

const REDIRECT_URI = 'https://auth.aidemaster.com/callback/github'

export async function getAccessToken (code: string, state: string) {
  const data = new FormData()
  data.append('client_id', process.env.GITHUB_CLIENT_ID || '')
  data.append('client_secret', process.env.GITHUB_CLIENT_SECRET || '')
  data.append('code', code)
  data.append('state', state)
  data.append('redirect_uri', REDIRECT_URI)
  const res = await axios.post('https://github.com/login/oauth/access_token', data)
  const responseData = res.data
  return {
    token: responseData.access_token,
    tokenType: responseData.token_type,
    scope: responseData.scope
  }
}

type UserInfo = {
  username: string;
  avatar: string;
}
export async function getUserInfo (accessToken: string): Promise<UserInfo> {
  return { username: '', avatar: '' }
}

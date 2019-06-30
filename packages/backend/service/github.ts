import axios from 'axios'

const REDIRECT_URI = 'https://auth.aidemaster.com/callback/github'

export async function getAccessToken (code: string, state: string) {
  const res = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: process.env.GITHUB_CLIENT_ID || '',
    client_secret: process.env.GITHUB_CLIENT_SECRET || '',
    code,
    state,
    redirect_uri: REDIRECT_URI
  })
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

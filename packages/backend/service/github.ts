import axios from 'axios'
import * as qs from 'qs'

const REDIRECT_URI = 'https://auth.aidemaster.com/callback/github'

export async function getAccessToken (code: string, state: string) {
  const res = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: process.env.GITHUB_CLIENT_ID || '',
    client_secret: process.env.GITHUB_CLIENT_SECRET || '',
    code,
    state,
    redirect_uri: REDIRECT_URI
  })
  const responseData = qs.parse(res.data)
  return {
    token: responseData.access_token,
    tokenType: responseData.token_type,
    scope: responseData.scope
  }
}

export interface UserInfo {
  avatar_url: string
  bio: string | null
  blog: string
  company: string
  created_at: Date
  email: string
  events_url: string
  followers: number
  followers_url: string
  following: number
  following_url: string
  gists_url: string
  gravatar_id: string
  hireable: boolean
  html_url: string
  id: number
  location: string
  login: string
  name: string
  node_id: string
  organizations_url: string
  public_gists: number
  public_repos: number
  received_events_url: string
  repos_url: string
  site_admin: boolean
  starred_url: string
  subscriptions_url: string
  type: string
  updated_at: Date
  url: string
}

export async function getUserInfo (accessToken: string): Promise<UserInfo> {
  const result = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `token ${accessToken}`
    }
  })
  return {
    ...result.data,
    created_at: new Date(result.data.created_at),
    updated_at: new Date(result.data.updated_at)
  }
}

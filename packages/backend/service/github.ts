export async function getAccessToken (code: string): Promise<string> {
  return ''
}

type UserInfo = {
  username: string;
  avatar: string;
}
export async function getUserInfo (accessToken: string): Promise<UserInfo> {
  return { username: '', avatar: '' }
}

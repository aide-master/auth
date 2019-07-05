// import UserModel from './models/user'
import AuthModel from './models/auth'
// import ProfileModel from './models/profile'

import { UserInfo } from './service/github'

export const getUserIdByGithubUserInfo = async (userInfo: UserInfo): Promise<string> => {
  const exists = await AuthModel.findOne({
    type: 'github',
    id: userInfo.id
  })
  if (exists) return exists.userId
  return ''
}

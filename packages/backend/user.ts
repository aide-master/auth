import User from './models/user'
import Auth from './models/auth'
import Profile from './models/profile'

import { UserInfo } from './service/github'

export const getUserIdByGithubUserInfo = async (userInfo: UserInfo): Promise<string> => {
  const group = 'common' // TODO: to be supported
  const exists = await Auth.findOne({
    type: 'github',
    id: userInfo.id
  })
  if (exists) return exists.userId

  // create profile
  const newProfile = new Profile({
    avatar: userInfo.avatar_url,
    nickname: userInfo.name,
    email: userInfo.email
  })
  const profile = await newProfile.save()

  // create user
  const newUser = new User({
    profile: profile._id,
    group
  })
  const user = await newUser.save()

  // create auth
  const newAuth = new Auth({
    group,
    userId: user._id,
    type: 'github',
    id: `${userInfo.id}`
  })
  await newAuth.save()
  return user._id
}

export const getUserById = async (id: string) => {
  const user = await User.findById(id)
  let profile
  if (user) {
    profile = await Profile.findById(user.profile)
  }
  return { id, profile }
}
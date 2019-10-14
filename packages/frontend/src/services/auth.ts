import { LoginOption } from '../models'
import * as rest from '../common/rest'
import { dispatch } from '../redux'

async function githubLogin (code: string) {
  await rest.post('/api/github', { code })
}

export async function getProfile () {
  let profile
  try {
    const res = await rest.get('/api/profile')
    profile = res.data
  } catch (error) {
    console.error(error)
  }
  dispatch({
    type: 'auth/profile',
    payload: profile
  })
}

export async function login (opt: LoginOption) {
  if (opt.github) {
    await githubLogin(opt.github)
    dispatch({
      type: 'auth/getProfile'
    })
  }
}

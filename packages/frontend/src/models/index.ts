import { createModel } from '@rematch/core'
import { login, getProfile } from '../services/auth'

export interface AuthState {
  name: string
  email: string
  avatar: string
  id: string
  token: string
}

export interface LoginOption {
  github?: string
}

export const auth = createModel<AuthState>({
  state: {},
  reducers: {
    profile (state: AuthState, payload: AuthState) {
      return Object.assign({}, { profile: payload })
    }
  },
  effects: {
    login: async (opt: LoginOption) => {
      login(opt)
    },
    getProfile: async () => {
      await getProfile()
    }
  }
})

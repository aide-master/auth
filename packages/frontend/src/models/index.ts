import { createModel } from '@rematch/core'
import { login, getProfile } from '../services/auth'

export type AuthState = {
  name: string;
  email: string;
  avatar: string;
  id: string;
  token: string;
}

export type LoginOption = {
  github?: string;
}

export const auth = createModel<AuthState>({
  state: {},
  reducers: {
    profile (state: AuthState, payload: AuthState) {
      return Object.assign({}, payload)
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

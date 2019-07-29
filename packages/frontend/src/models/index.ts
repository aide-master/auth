import { login } from '../services/auth'
export const auth = {
  state: {},
  effects: {
    login: async () => {
      login()
    }
  }
}

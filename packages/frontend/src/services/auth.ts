import * as utils from '../common/utils'

export async function login () {
  // TODO: implement
  console.log('login service')
  const token = utils.getToken()
  console.log({ token })
}

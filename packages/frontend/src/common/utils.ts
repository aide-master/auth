import Cookie from 'js-cookie'

export function getCookie (key: string): string {
  return Cookie.get(key) || ''
}

export function setCookie (key: string, value: string) {
  Cookie.set(key, value)
}

export function getToken () {
  return getCookie('token')
}

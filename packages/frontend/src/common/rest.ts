import axios, { AxiosRequestConfig } from 'axios'
import * as utils from '../common/utils'

function getAuthHeader () {
  const token = utils.getToken() || ''
  return { Authorization: token }
}

export async function get (url: string, config?: AxiosRequestConfig) {
  const options = Object.assign({}, config, {
    headers: getAuthHeader()
  })
  return axios.get(url, options)
}

export async function post (url: string, data: any, config?: AxiosRequestConfig) {
  const options = Object.assign({}, config, {
    headers: getAuthHeader()
  })
  return axios.post(url, data, options)
}

export async function put (url: string, data: any, config?: AxiosRequestConfig) {
  const options = Object.assign({}, config, {
    headers: getAuthHeader()
  })
  return axios.put(url, data, options)
}

export async function del (url: string, config?: AxiosRequestConfig) {
  const options = Object.assign({}, config, {
    headers: getAuthHeader()
  })
  return axios.delete(url, options)
}

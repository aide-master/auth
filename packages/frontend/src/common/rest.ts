import axios, { AxiosRequestConfig } from 'axios'
import * as utils from '../common/utils'

function getAuthHeader () {
  const token = utils.getToken() || ''
  return { Authorization: token }
}

function getOptions (config?: AxiosRequestConfig) {
  const options: AxiosRequestConfig = Object.assign({}, config, {
    headers: getAuthHeader(),
    withCredentials: true
  })
  return options
}

export async function get (url: string, config?: AxiosRequestConfig) {
  return axios.get(url, getOptions(config))
}

export async function post (url: string, data: any, config?: AxiosRequestConfig) {
  return axios.post(url, data, getOptions(config))
}

export async function put (url: string, data: any, config?: AxiosRequestConfig) {
  return axios.put(url, data, getOptions(config))
}

export async function del (url: string, config?: AxiosRequestConfig) {
  return axios.delete(url, getOptions(config))
}

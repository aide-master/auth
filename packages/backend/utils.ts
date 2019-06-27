import { AnyObject } from './types'

export function parseReqBody (body: string | null): AnyObject {
  try {
    if (body) return JSON.parse(body)
  } catch (error) { }

  return {}
}

export class ApiError extends Error {
  code: string
  msg: string

  constructor (code: string, msg: string) {
    super()

    this.code = code
    this.msg = msg
  }
}

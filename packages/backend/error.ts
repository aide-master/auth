export class ApiError extends Error {
  public code: string
  public msg: string

  public constructor (code: string, msg: string) {
    super()

    this.code = code
    this.msg = msg
  }
}

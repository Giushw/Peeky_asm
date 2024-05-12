interface ErrorType {
  code: number,
  type: string,
  info: string
}

export interface Error {
  success: boolean,
  error: ErrorType
}

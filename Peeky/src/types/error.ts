interface ErrorType {
  code: number,
  type: string,
  info: string
}

export interface Error {
  success: boolean,
  error: ErrorType
}

// {
//   "success": false,
//   "error": {
//       "code": 105,
//       "type": "https_access_restricted",
//       "info": "Access Restricted - Your current Subscription Plan does not support HTTPS Encryption."
//   }
// }
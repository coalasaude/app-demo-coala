import apiRequest from '../../api'

export interface VerifyCodeParams {
  code: string
}

export const verifyCode = (body: VerifyCodeParams) =>
  apiRequest<void>({
    path: 'v2/verify-code',
    throwError: true,
    method: 'POST',
    body: body,
  })

import apiRequest from '../../api'

export interface SendCodeParams {
  access: string
  ignoreValidations?: boolean
}

export const sendCode = (body: SendCodeParams) =>
  apiRequest<void>({
    path: 'v2/send-code',
    throwError: true,
    method: 'POST',
    body: body,
  })

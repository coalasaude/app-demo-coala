import apiRequest from '../../api'

interface IActivateUserPayload {
  name: string
  lastName: string
  cpf: string
  isSigned: boolean
}

export const activateUser = (body: IActivateUserPayload) =>
  apiRequest<void>({
    path: 'v2/activate-user',
    throwError: true,
    method: 'POST',
    useApiFilters: false,
    body: body,
  })

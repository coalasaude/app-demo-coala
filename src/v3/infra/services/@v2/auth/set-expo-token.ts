import apiRequest from '../../api'

interface ISetExpoToken {
  token: string
}

interface ISetExpoTokenResponse {
  token: string
}

export const setExpoToken = (body: ISetExpoToken) =>
  apiRequest<ISetExpoTokenResponse>({
    path: 'me/expo-token',
    throwError: true,
    method: 'POST',
    useApiFilters: false,
    body,
  }) as Promise<ISetExpoTokenResponse>

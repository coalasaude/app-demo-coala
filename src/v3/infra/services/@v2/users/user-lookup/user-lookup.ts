import apiRequest from '../../../api'

interface IUserLookupPayload {
  email: string;
  telephone: string
}

interface IUserLookupResponse {
  exists: boolean
}

export const userLookup = (body: IUserLookupPayload) =>
  apiRequest<[IUserLookupResponse, null]>({
    path: 'v2/user-lookup',
    throwError: false,
    method: 'POST',
    useApiFilters: false,
    body: body,
  }) as Promise<[IUserLookupResponse, null]>

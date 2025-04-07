import asyncRequest, { TRequest } from '@/services/api'
import { AuthStorage } from '@/services/AuthStorage'

export interface TApiRequest {
  execute<T extends Record<any, any>>(params: TRequest<T>): Promise<T>
}
export class ApiRequest {
  private auth
  constructor() {
    this.auth = AuthStorage.get()
  }

  async execute<T extends Record<any, any>>(params: TRequest<T>) {
    this.auth = AuthStorage.get()

    const response = await asyncRequest<T>(params)

    if (
      (response instanceof Boolean && !response) ||
      (response instanceof Object && response && 'isError' in response)
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { isError, ...others } = response
      throw others
    }

    return response 
  }
}

export const apiRequest = new ApiRequest()

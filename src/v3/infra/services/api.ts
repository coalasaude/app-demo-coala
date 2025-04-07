import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import Router from 'next/router'

import { CONTENT_TYPES, RESPONSE_TYPES } from '@/constants/services'
import { queryClient } from '@/pages/_app'

import { AuthStorage } from './AuthStorage'
import { ApiFilters } from './ApiFilters'

export interface TRequest<T> {
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: any
  cType?: string
  rType?: string
  queryParams?: any
  pathParams?: any
  returnError?: boolean
  headers?: any
  useSpinner?: boolean
  useExternalPath?: boolean
  getUserByRouterPath?: boolean
  useApiFilters?: boolean
  formatter?: (values: any) => T
  throwError?: boolean
}

export interface RequestError {
  isError: boolean
  code?: number
  data?: any
}

let isRefreshing = false

let failedRequestQueue: {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}[] = []

export function api() {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
    headers: {
      Authorization: `Bearer ${AuthStorage.get().accessToken}`,
    },
  })

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      // If the request is not authenticated, we will try to refresh the token
      if (error.response?.status === 401) {
        // Recover the original request
        const originalConfig = error.config

        if (!originalConfig) return Promise.reject(error)

        // Prevent multiple requests to refresh the token
        if (!isRefreshing) {
          isRefreshing = true

          api
            .post('/v2/refresh-token', { refreshToken: AuthStorage.get().refreshToken })
            .then((response) => {
              // Get new tokens
              const { token, refreshToken } = response.data

              // Update the storage with new tokens
              AuthStorage.set({
                accessToken: token,
                refreshToken,
              })

              // Update Authorization header of the api instance with the new token
              api.defaults.headers.Authorization = `Bearer ${token}`

              // Process the failed requests and clear the queue
              failedRequestQueue.forEach((request) => request.onSuccess(token))
              failedRequestQueue = []
            })
            .catch((error) => {
              // Returns the error to the failed requests and clear the queue
              failedRequestQueue.forEach((request) => request.onFailure(error))
              failedRequestQueue = []

              signOut()
            })
            .finally(() => {
              // Reset the flag to allow the next requests to refresh the token
              isRefreshing = false
            })
        }

        return new Promise((resolve, reject) => {
          failedRequestQueue.push({
            onSuccess: (token) => {
              // Update the original request with the new token
              originalConfig.headers.Authorization = `Bearer ${token}`

              // Retry the request
              resolve(api(originalConfig))
            },
            onFailure: (error) => {
              // Reject the request with the error
              reject(error)
            },
          })
        })
      }

      // If the error is not related to the token, we will return the error
      return Promise.reject(error)
    },
  )

  return api
}

function signOut() {
  AuthStorage.logout()
  queryClient.clear()
  Router.push('/')
}

const apiInstance = api()
let cancelToken = axios.CancelToken.source()

export const cancelRequests = () => {
  const previousToken = cancelToken
  cancelToken = axios.CancelToken.source()
  previousToken.cancel('Requisição foi cancelada.')
}

async function apiRequest<T>({
  path,
  method,
  body: data,
  cType,
  rType,
  queryParams,
  pathParams: propPathParams,
  headers: propHeaders,
  useExternalPath,
  useApiFilters = undefined,
  throwError,
  getUserByRouterPath,
}: TRequest<T>): Promise<T | RequestError> {
  const contentType = cType || CONTENT_TYPES.JSON
  const responseType = rType || RESPONSE_TYPES.JSON
  let headers = propHeaders || {}
  headers['Content-Type'] = contentType
  const storage = AuthStorage.get()

  const gerUserId = () => {
    let userId = storage.selectedChildren || storage.userId || ''
    if (getUserByRouterPath) userId = Router.query.userId as string
    if (propPathParams?.userId) userId = propPathParams.userId
    return userId
  }

  const userId = gerUserId()
  const pathParams = {
    ...propPathParams,
    userId,
  }
  const bindPathParams = () => {
    return Object.keys(pathParams).reduce((result, key) => {
      const regex = new RegExp(`:${key}`, 'g')
      return result.replace(regex, pathParams[key])
    }, path)
  }
  const bindedPath = pathParams ? bindPathParams() : path
  let url = useExternalPath ? bindedPath : `${process.env.NEXT_PUBLIC_BASE_URL_API}${bindedPath}`
  const params = {}
  let query = ''

  if (queryParams && Object.keys(queryParams).length > 0) {
    query = Object.keys(queryParams).reduce((result, key) => {
      const value = queryParams[key]
      if (value === undefined || value === null || !value || value?.length === 0) {
        return result
      }
      if (!result) {
        return `?${key}=${value}`
      }
      return `${result}&${key}=${value}`
    }, '')
  }

  if (query && url.endsWith('/')) {
    url = `${url}${query}`
  } else if (query) {
    url = `${url}/${query}`
  } else if (!url.endsWith('/')) {
    url = `${url}/`
  }

  if (storage?.accessToken) {
    headers = Object.assign(
      {
        Authorization: `Bearer ${storage.accessToken}`,
      },
      headers,
    )
  }

  const isWhitelistedRoute = ApiFilters.isWhitelistedRoute(Router.pathname)
  if ((useApiFilters || useApiFilters === undefined) && isWhitelistedRoute) {
    headers = Object.assign(
      {
        Authorization: `Bearer ${storage.accessToken}`,
        'x-institution-id': storage.selectedInstitution,
        'x-children-id': storage.selectedChildren,
        'x-self-access': storage.selfAccess,
      },
      headers,
    )
  }

  try {
    const response = await apiInstance({
      method,
      headers,
      url,
      data,
      contentType:
        cType === CONTENT_TYPES.MULTIPART ? `${cType} boundary=${data?._boundary}` : cType,
      responseType,
      params,
      cancelToken: cancelToken.token,
    } as AxiosRequestConfig)
    const { data: responseData } = response
    return responseData as T
  } catch (error: unknown) {
    if (throwError) {
      throw error
    }

    if (!(error instanceof AxiosError)) {
      return {
        isError: true,
      }
    }
    if (/Network Error/i.test(error.message)) {
      return { code: 503, isError: true }
    }

    if (!error.response) {
      return {
        isError: true,
      }
    }

    const status = error.response.status
    const rData = error.response.data

    if (status === 500) {
      cancelToken.cancel('Requisição foi cancelada.')
      cancelToken = axios.CancelToken.source()
    }

    return {
      code: status,
      data: rData,
      isError: true,
    }
  }
}

export { apiInstance }

export default apiRequest

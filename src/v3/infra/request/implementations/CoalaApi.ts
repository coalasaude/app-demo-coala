import https from 'https'

import axios from 'axios'

import { RequestOptions, RequestService } from '..'

export const coalaApi = (config?: RequestOptions) => {
  const agent = new https.Agent({
    rejectUnauthorized: false, // This bypasses certificate validation (not recommended)
  })

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
    httpAgent: agent,
    ...config,
  })

  return new RequestService(axiosInstance)
}

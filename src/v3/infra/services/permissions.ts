import { TApiIndicationResponse } from '@/v3/domain/api/ApiIndicationResponse'

import { apiInstance } from './api'

export const listPermissions = () =>
  apiInstance.get<TApiIndicationResponse[]>(`${process.env.NEXT_PUBLIC_BASE_URL_API}me/permissions`)

import { TApiIndicationResponse } from '@/v3/domain/api/ApiIndicationResponse'
import { TApiIndicationRequest } from '@/v3/domain/api/ApiIndicatioRequest'
import { IndicationStatus, RedeemStatus } from '@/v3/domain/Indication'

import { apiInstance } from './api'

export interface IndicationApiFilter {
  user?: string
  status?: IndicationStatus | RedeemStatus
}

export interface TApiIndicationCountResponse {
  valid: number
  redeemed: number
  available: number
}

export const listIndication = (filter?: IndicationApiFilter) =>
  apiInstance.get<TApiIndicationResponse[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}gaming/indication`,
    {
      params: {
        limit: 1000,
        ...filter,
      },
    }
  )

export const getIndication = (id: string) =>
  apiInstance.get<TApiIndicationResponse[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}gaming/indication/${id}`
  )

export const updateIndication = ({ id, ...rest }: Partial<TApiIndicationRequest>) =>
  apiInstance.put<TApiIndicationRequest>(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}gaming/indication/${id}`,
    rest
  )

export const createIndication = (body: TApiIndicationRequest) =>
  apiInstance.post<TApiIndicationRequest>(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}gaming/indication`,
    body
  )

export const getIndicationCount = () =>
  apiInstance.get<TApiIndicationCountResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}gaming/indication/count`
  )

export const getRanking = () =>
  apiInstance.get<TApiIndicationResponse[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}gaming/indication/ranking`,
    {
      params: {
        limit: 1000,
      },
    }
  )

export const getRedeem = (filter?: IndicationApiFilter) =>
  apiInstance.get<TApiIndicationResponse[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}gaming/indication/redeem`,
    {
      params: {
        limit: 1000,
        ...filter,
      },
    }
  )

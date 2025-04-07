import { THealthUnitResponse } from '@/v3/domain/api/ApiHealthUnitResponse'
import { Institution } from '@/types/institution'
import { IListPaginationResponse } from '@/types/request'
import { HealthUnit } from '@/types/healthUnit'
import { ListHealthUnits } from '@/v3/presentation/hooks/api/healthUnit/useFetchListHealthUnit'

import apiRequest from './api'

interface EditHealthUnitParams {
  id: number
  payload: Partial<THealthUnitResponse>
}

interface GetHealthUnitInstitutionsFilter {
  name?: string
  neighborhood?: string
  limit?: number
  offset?: number
}

/**
 * @deprecated Use readHealthUnit instead
 */
export const getHealthUnit = (id: number) =>
  apiRequest<THealthUnitResponse>({
    method: 'GET',
    path: `health-units/${id}`,
  })

/**
 * @deprecated Use editHealthUnit from v2 instead
 */
export const editHealthUnit = ({ id, payload }: EditHealthUnitParams) =>
  apiRequest<any>({
    method: 'PATCH',
    path: `health-units/${id}`,
    body: payload,
  })

/**
 * @deprecated Use addHealthUnit from v2 instead
 */
export const addHealthUnit = ({ payload }: { payload: Partial<THealthUnitResponse> }) =>
  apiRequest<any>({
    method: 'POST',
    path: 'health-units',
    body: payload,
  })

/**
 * @deprecated use browseInstitutions from health unit v2 instead
 */
export const getHealthUnitInstitutions = (params: {
  id: number
  filter?: GetHealthUnitInstitutionsFilter
}) =>
  apiRequest<IListPaginationResponse<Institution>>({
    method: 'GET',
    path: `health-units/${params.id}/institutions`,
    queryParams: {
      ...params.filter,
    },
  })

/**
 * @deprecated Use deleteHealthUnit from v2 instead
 */
export const inactiveHealthUnit = (id: number) =>
  apiRequest<any>({
    method: 'DELETE',
    path: `health-units/${id}`,
  })

export const getInstitutionHealthUnits = (id: number) =>
  apiRequest<HealthUnit[]>({
    method: 'GET',
    path: `health-units/institutions/${id}`,
  })

export const listHealthUnits = (filter?: ListHealthUnits) =>
  apiRequest<IListPaginationResponse<HealthUnit>>({
    method: 'GET',
    path: `health-units`,
    queryParams: {
      ...filter,
    },
  })

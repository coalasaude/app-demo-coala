import { convertToArray } from '@/v3/utils/convert-to-array'

import { IAppointmentFilterFields } from '../type'

export const convertFilterParams = (params: Record<string, any> = {}): IAppointmentFilterFields => {
  const convertedParams: IAppointmentFilterFields = {}

  if (params.offset) convertedParams.offset = Number(params.offset)
  if (params.limit) convertedParams.limit = Number(params.limit)
  if (params.searchName) convertedParams.searchName = params.searchName
  if (params.searchDate) convertedParams.searchDate = new Date(params.searchDate)
  if (params.direction) convertedParams.direction = params.direction
  if (params.orderBy) convertedParams.orderBy = params.orderBy
  if (params.complaintId) convertedParams.complaintId = params.complaintId
  if (params.institutionId) convertedParams.institutionId = Number(params.institutionId)
  if (params.status) convertedParams.status = convertToArray(params.status)
  if (params.classification) convertedParams.classification = convertToArray(params.classification)

  return convertedParams
}

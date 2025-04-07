import { TApiUserResponse } from '@/v3/domain/api/ApiUserResponse'

import apiRequest from '../api'

export interface CreateUserHealthInsurancePayload {
  file: File
  userId: number
  insuranceCompany: string
  code: string
  validUntil: Date
  plan: string
  isMePath?: boolean
}

export interface RemoveUserHealthInsurancePayload {
  id: number
  isMePath?: boolean
}

export interface CreateHealthInsuranceFormData {
  formData: FormData
  prefix?: string
  payload: CreateUserHealthInsurancePayload
}

function createFormData({ formData, payload, prefix = '' }: CreateHealthInsuranceFormData) {
  if (payload.file) formData.append('file', payload.file)
  if (payload.insuranceCompany)
    formData.append(prefix + 'insurance_company', payload.insuranceCompany)
  if (payload.code) formData.append(prefix + 'code', payload.code)
  if (payload.plan) formData.append(prefix + 'plan', payload.plan)
  if (payload.validUntil) formData.append(prefix + 'valid_until', String(payload.validUntil))
  if (payload.userId) formData.append(prefix + 'user_id', String(payload.userId))

  return formData
}

export const createUserHealthInsurance = ({
  isMePath = true,
  ...payload
}: CreateUserHealthInsurancePayload) => {
  const formData = new FormData()
  createFormData({ payload, formData })

  return apiRequest<TApiUserResponse>({
    method: 'POST',
    throwError: true,
    path: isMePath ? 'me/health-insurance' : 'health-insurance',
    getUserByRouterPath: true,
    body: formData,
    cType: 'multipart/form-data',
  })
}

export const createManyUserHealthInsurance = (payload: CreateUserHealthInsurancePayload[]) =>
  Promise.all(payload.map((item) => createUserHealthInsurance(item)))

export const deleteUserHealthInsurance = ({
  id,
  isMePath = true,
}: RemoveUserHealthInsurancePayload) => {
  return apiRequest<TApiUserResponse>({
    method: 'DELETE',
    getUserByRouterPath: true,
    throwError: true,
    path: (isMePath ? 'me/health-insurance' : 'health-insurance') + `/${id}`,
  })
}

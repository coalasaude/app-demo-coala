import {
  TApiGetByUserIdVaccineResponse,
  TApiUserVaccineResponse,
} from '@/v3/domain/api/ApiUserVaccineResponse'
import { TApiVaccineComprovantResponse } from '@/v3/domain/api/ApiVaccineComprovantResponse'

import apiRequest from './api'

export interface VaccinePayload {
  vaccineId: number
  id?: number
  dosage: string[]
  reinforcement: string[]
}

export interface CreateVaccinesPayload {
  userId: number
  status: string
  comprovantId: number
  vaccinePayload: VaccinePayload[]
}

export interface CreateVaccineWithComprovantPayload {
  userId: number
  status: string
  file: File
  vaccinePayload: VaccinePayload[]
}

export interface UpdateVaccineWithComprovantPayload {
  userId: number
  status: string
  file?: File
  vaccinePayload: Partial<VaccinePayload>[]
}

export interface QueryVaccineComprovantPayload {
  vaccineId?: number
}
export interface UpdateVaccineWithComprovantPayload {
  userId: number
  status: string
  file?: File
  vaccinePayload: Partial<VaccinePayload>[]
}

function createVaccinesFormData({
  formData,
  vaccines,
}: {
  formData: FormData
  prefix?: string
  vaccines: Partial<VaccinePayload>[]
}) {
  vaccines.forEach((vaccine, index) => {
    const prefix = `vaccines[${index}]`

    if (vaccine.vaccineId) formData.append(`${prefix}.vaccine_id`, String(vaccine.vaccineId))
    if (vaccine.id) formData.append(`${prefix}.id`, String(vaccine.id))

    vaccine.dosage?.forEach((dosage, index) => {
      formData.append(`${prefix}.dosage[${index}]`, String(dosage))
    })

    vaccine.reinforcement?.forEach((reinforcement, index) => {
      formData.append(`${prefix}.reinforcement[${index}]`, String(reinforcement))
    })
  })

  return formData
}

export const getAllVaccine = (userId?: number) =>
  apiRequest<TApiGetByUserIdVaccineResponse>({
    method: 'GET',
    path: `user/${userId}/health-history/all-vaccine`,
    throwError: true,
  })

export const getAllVaccineByUserId = (userId?: number) =>
  apiRequest<TApiGetByUserIdVaccineResponse>({
    method: 'GET',
    path: `user/${userId}/health-history/vaccine`,
    throwError: true,
  })

export const getVaccineByUserId = (userId?: number, id?: number) =>
  apiRequest<TApiUserVaccineResponse>({
    method: 'GET',
    path: `user/${userId}/health-history/vaccine/${id}`,
    throwError: true,
  })

export const getVaccineComprovant = (userId?: number, options?: QueryVaccineComprovantPayload) => {
  return apiRequest<TApiVaccineComprovantResponse[]>({
    method: 'GET',
    queryParams: options,
    path: `user/${userId}/health-history/vaccine/comprovants`,
    throwError: true,
  })
}

export const createVaccine = (payload: CreateVaccinesPayload) =>
  apiRequest<any>({
    method: 'POST',
    throwError: true,
    path: `user/${payload.userId}/health-history/vaccine`,
    body: {
      status: payload.status,
      comprovant_id: payload.comprovantId,
      vaccines: payload.vaccinePayload.map((e) => {
        return {
          vaccine_id: e.vaccineId,
          ...e,
        }
      }),
    },
  })

export const createVaccineWithComprovant = (payload: CreateVaccineWithComprovantPayload) => {
  const formData = new FormData()
  formData.append('file', payload.file)
  formData.append('status', payload.status)

  createVaccinesFormData({ formData, vaccines: payload.vaccinePayload })

  return apiRequest<CreateVaccinesPayload>({
    method: 'POST',
    path: `user/${payload.userId}/health-history/vaccine/vaccine-with-comprovant`,
    body: formData,
    throwError: true,
    cType: 'multipart/form-data',
  })
}

export const updateVaccineWithComprovant = (payload: UpdateVaccineWithComprovantPayload) => {
  const formData = new FormData()

  if (payload.file) formData.append('file', payload.file)
  formData.append('status', payload.status)
  createVaccinesFormData({ formData, vaccines: payload.vaccinePayload })

  return apiRequest<CreateVaccinesPayload>({
    method: 'PATCH',
    path: `user/${payload.userId}/health-history/vaccine/vaccine-with-comprovant`,
    body: formData,
    throwError: true,
    cType: 'multipart/form-data',
  })
}

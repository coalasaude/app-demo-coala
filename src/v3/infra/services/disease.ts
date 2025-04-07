import {
  TApiDiseaseCIDOptionsResponse,
  TApiGetAllDiseaseResponse,
} from '@/v3/domain/api/ApiDiseaseResponse'
import { renameFile } from '@/v3/utils/rename-file'

import apiRequest from './api'

export interface CreateDiseasePayload {
  diagnoseDate: Date
  cidId?: string
  otherDisease?: string
  observation: string
  treatmentPerformed: boolean
  file?: File | null
}

export interface CreateManyDiseasePayload {
  diseases: CreateDiseasePayload[]
  userId: number
}

export interface CreateDiseaseFormData {
  userId: number
  formData: FormData
  prefix?: string
  disease: CreateDiseasePayload
}

function createDiseaseFormData({ formData, disease, prefix = '', userId }: CreateDiseaseFormData) {
  if (disease.file) formData.append('file', disease.file)

  if (disease.otherDisease) formData.append(prefix + 'otherDisease', disease.otherDisease)
  if (disease.cidId) formData.append(prefix + 'cidId', disease.cidId)
  formData.append(prefix + 'diagnoseDate', String(disease.diagnoseDate))
  formData.append(prefix + 'observation', disease.observation)
  formData.append(prefix + 'treatmentPerformed', String(disease.treatmentPerformed))
  formData.append(prefix + 'userId', String(userId))

  return formData
}

function createDiseasesFormData(
  formData: FormData,
  userId: number,
  diseases: CreateDiseasePayload[],
) {
  diseases.forEach((disease, index) => {
    const prefix = `diseases[${index}].`

    if (disease.file) {
      const file = renameFile(disease.file, (name) => `${name}${index}`)
      disease.file = file

      formData.append(`${prefix}fileName`, disease.file.name)
    }

    createDiseaseFormData({ formData, disease, prefix, userId })
  })
}

export const createDisease = async (payload: CreateDiseasePayload & { userId: number }) => {
  const formData = new FormData()
  createDiseaseFormData({ disease: payload, formData, userId: payload.userId })

  return apiRequest({
    method: 'POST',
    path: `user/${payload.userId}/health-history/disease`,
    body: formData,
    throwError: true,
    cType: 'multipart/form-data',
  })
}

export const updateDiseaseService = async (
  payload: CreateDiseasePayload & { userId: number; id: number },
) => {
  const formData = new FormData()
  createDiseaseFormData({ disease: payload, formData, userId: payload.userId })

  return apiRequest({
    method: 'PUT',
    path: `user/${payload.userId}/health-history/disease/${payload.id}`,
    body: formData,
    throwError: true,
    cType: 'multipart/form-data',
  })
}

export const createManyDisease = ({ userId, diseases }: CreateManyDiseasePayload) => {
  const formData = new FormData()
  createDiseasesFormData(formData, userId, diseases)

  return apiRequest({
    method: 'POST',
    path: 'user/:userId/health-history/disease/many',
    body: formData,
    throwError: true,
    pathParams: { userId },
    cType: 'multipart/form-data',
  })
}

export const getAllDiseaseCIDOptions = (params: {
  limit: number
  search: string
  onlyPopularName?: boolean
}) =>
  apiRequest<TApiDiseaseCIDOptionsResponse>({
    method: 'GET',
    path: `user/:userId/health-history/cid`,
    throwError: true,
    queryParams: params,
  })

export const getAllDiseasesByUserId = (userId?: number) =>
  apiRequest<TApiGetAllDiseaseResponse>({
    method: 'GET',
    path: `user/${userId}/health-history/disease`,
  })

export const getDiseasesById = (userId?: number, id?: number) =>
  apiRequest<TApiGetAllDiseaseResponse>({
    method: 'GET',
    path: `user/:userId/health-history/disease/:id`,
    pathParams: { userId, id },
  })

export const removeDisease = (id: number, userId: number) =>
  apiRequest({
    method: 'DELETE',
    path: `user/${userId}/health-history/disease/${id}`,
    useApiFilters: true,
    throwError: true,
  })

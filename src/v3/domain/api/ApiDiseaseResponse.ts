import { TDocument } from '../Document'

import { DefaultStatus } from './ApiCourseResponse'

export type TApiDiseaseCIDOptionsResponse = {
  id: number
  categoryDescription: string
  codeDescription: string
  popularName: string
  code: string
}[]

export interface TApiUserDiseaseResponse {
  id: number
  cidId: number
  observation: string
  treatmentPerformed: boolean
  diagnoseDate: string
  status: DefaultStatus
  document: TDocument
  documentId: number
  createdAt: string
  cid: {
    id: number
    categoryDescription: string
    popularName?: string
  }
  diseaseName: string
  otherDisease?: string
}

export interface TApiGetAllDiseaseResponse {
  count: number
  results: TApiUserDiseaseResponse[]
}

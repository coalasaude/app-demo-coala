import { TDocument } from '../Document'

export interface TApiUserVaccineOptionsResponse {
  id: number
  name: string
  observation?: string
}

export interface TApiGetAllUserVaccineResponse {
  count: number
  results: TApiUserVaccineOptionsResponse[]
}

export interface TApiUserVaccineResponse {
  created_at: string
  id: number
  vaccine_id: number
  batch?: string
  dosage_dose?: number
  vaccine_manufacturer?: string
  observation?: string
  vaccine_document_id?: number
  vaccine?: {
    name: string
  }
  date?: string
  UserVaccineDosage: {
    id: number
    dosage_date: string
  }[]
  UserVaccineReinforcement: {
    id: number
    reinforcement_date: string
  }[]
  vaccineDocument: {
    document: TDocument
  }
  documents: TDocument[]
}

export interface TApiGetByUserIdVaccineResponse {
  count: number
  results: TApiUserVaccineResponse[]
}

import { TDocument } from '../Document'

import { TApiUserVaccineResponse } from './ApiUserVaccineResponse'


export interface TApiVaccineComprovantResponse {
  Vaccine: TApiUserVaccineResponse[]
  document: TDocument
  id: number
  created_at: Date
}
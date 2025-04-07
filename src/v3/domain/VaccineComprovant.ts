import { TApiVaccineComprovantResponse } from '@/v3/domain/api/ApiVaccineComprovantResponse'

import { Document } from './Document'
import { UserVaccine } from './UserVaccine'

export class VaccineComprovant {
  createdAt: Date
  id: number
  Vaccine?: UserVaccine[]
  document?: Document

  constructor(params: TApiVaccineComprovantResponse) {
    this.id = params.id
    this.createdAt = params.created_at
  
    this.Vaccine = params.Vaccine
      ? params.Vaccine.map((e) => {
          return new UserVaccine(e)
        })
      : []

    this.document = params.document ? new Document(params.document) : undefined
  }
}

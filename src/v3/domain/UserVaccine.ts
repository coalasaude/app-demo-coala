import { Document } from './Document'
import { TApiUserVaccineResponse } from './api/ApiUserVaccineResponse'

export class UserVaccine {
  createdAt: string
  id: number
  batch?: string
  dosageDose?: number
  vaccineManufacturer?: string
  observation?: string
  vaccineDocumentId?: number
  vaccineId: number
  vaccine?: {
    name?: string
  }
  date?: string
  userVaccineDosage: {
    id: number
    dosageDate: string
  }[] = []
  userVaccineReinforcement: {
    id: number
    reinforcementDate: string
  }[] = []
  vaccineDocument?: {
    document?: Document
  }
  documents?: Document[]

  constructor(params: TApiUserVaccineResponse) {
    this.id = params.id
    this.vaccineId = params.vaccine_id
    this.batch = params?.batch
    this.createdAt = params.created_at
    this.dosageDose = params?.dosage_dose
    this.vaccineManufacturer = params?.vaccine_manufacturer
    this.observation = params.observation
    this.vaccineDocumentId = params.vaccine_document_id
    this.vaccine = params.vaccine
      ? {
          name: params.vaccine?.name,
        }
      : undefined
    this.date = params.date
    this.userVaccineDosage = params.UserVaccineDosage
      ? params.UserVaccineDosage.map((e) => {
          return { id: e.id, dosageDate: e.dosage_date }
        })
      : []
    this.userVaccineReinforcement = params.UserVaccineReinforcement
      ? params.UserVaccineReinforcement.map((e) => {
          return { id: e.id, reinforcementDate: e.reinforcement_date }
        })
      : []
    this.vaccineDocument = params.vaccineDocument
      ? {
          document: params.vaccineDocument?.document
            ? new Document(params.vaccineDocument.document)
            : undefined,
        }
      : undefined

    if (params.documents) {
      this.documents = params.documents.map((e) => new Document(e))
    } else if (this.vaccineDocument?.document) {
      this.documents = [this.vaccineDocument?.document]
    }
  }
}

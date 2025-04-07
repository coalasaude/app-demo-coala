import { Document } from './Document'
import { DefaultStatus } from './api/ApiCourseResponse'
import { TApiUserDiseaseResponse } from './api/ApiDiseaseResponse'

export class UserDisease {
  id: number
  cidId: number
  observation: string
  treatmentPerformed: boolean
  diagnoseDate: string
  status: DefaultStatus
  document: Document | null
  documentId: number
  createdAt: string
  cid?: {
    id: number
    categoryDescription: string
    popularName?: string
  }
  diseaseName: string
  otherDisease?: string

  constructor(params: TApiUserDiseaseResponse) {
    this.id = params.id
    this.cidId = params.cidId
    this.observation = params.observation
    this.treatmentPerformed = params.treatmentPerformed
    this.diagnoseDate = params.diagnoseDate
    this.status = params.status
    this.document = params.document ? new Document(params.document) : null
    this.documentId = params.documentId
    this.createdAt = params.createdAt
    this.diseaseName = params.diseaseName
    this.otherDisease = params.otherDisease

    if (params.cid)
      this.cid = {
        id: params.cid.id,
        popularName: params.cid.popularName,
        categoryDescription: params.cid.categoryDescription,
      }
  }
}

import { AppFileModel } from '../../@shared/app-file.model'

import { CidModel, CidModelConstructor } from './cid.model'

export interface DiseaseModelConstructor {
  id: number
  userId: number
  treatmentPerformed: boolean
  diagnoseDate: Date
  observation?: string
  otherDisease?: string
  cid?: CidModelConstructor
  document?: AppFileModel
}

export class DiseaseModel {
  public readonly id: number
  public readonly userId: number
  public readonly treatmentPerformed: boolean
  public readonly diagnoseDate: Date
  public readonly observation?: string
  public readonly otherDisease?: string
  public readonly cid?: CidModel
  public readonly document?: AppFileModel

  constructor(props: DiseaseModelConstructor) {
    this.id = props?.id
    this.userId = props?.userId
    this.observation = props?.observation
    this.treatmentPerformed = props?.treatmentPerformed
    this.diagnoseDate = props?.diagnoseDate
    this.otherDisease = props?.otherDisease
    this.cid = props?.cid
    this.document = props.document ? new AppFileModel(props.document) : undefined
  }

  public getDiseaseName() {
    return (this.cid ? this.cid.name : this.otherDisease) || ''
  }
}

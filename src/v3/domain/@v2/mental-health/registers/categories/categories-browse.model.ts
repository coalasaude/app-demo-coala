import { PedagogicalRecordType } from '../../enums/pedagogical-record-type.enum'

export interface MentalHealthRegisterCategoriesBrowseModelConstructor {
  data: { type: PedagogicalRecordType }[]
}

export class MentalHealthRegisterCategoriesBrowseModel {
  public readonly data: PedagogicalRecordType[]

  constructor(params: MentalHealthRegisterCategoriesBrowseModelConstructor) {
    this.data = params.data.map((item) => item.type)
  }
}

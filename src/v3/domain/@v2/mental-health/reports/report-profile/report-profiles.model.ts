import { medicalProfileTypes } from '../../enums/medicalProfileTypes.enum'

export interface ReportProfileModelConstructor {
  id: number
  name: medicalProfileTypes
}

export class ReportProfileModel {
  public readonly id: number
  public readonly name: medicalProfileTypes

  constructor(props: ReportProfileModelConstructor) {
    this.id = props.id
    this.name = props.name
  }
}

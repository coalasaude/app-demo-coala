import { BloodType } from '@/v3/presentation/enums/general-information.enum'

export interface GeneralInformationModelConstructor {
  id: number
  bloodType: BloodType
}

export class GeneralInformationModel {
  public readonly id: number
  bloodType: BloodType

  constructor(props: GeneralInformationModelConstructor) {
    this.id = props?.id
    this.bloodType = props?.bloodType
  }
}

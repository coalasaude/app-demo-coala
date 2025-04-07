export interface UserVaccineBrowseDataModelConstructor {
  id: number
  name: string
  vaccineDosage: { id: number; dosageDate: Date }[]
  vaccineReinforcement: { id: number; reinforcementDate: Date }[]
}

export class UserVaccineBrowseDataModel {
  public readonly id: number
  public readonly name: string
  public readonly vaccineDosage: { id: number; dosageDate: Date }[]
  public readonly vaccineReinforcement: { id: number; reinforcementDate: Date }[]

  constructor(props: UserVaccineBrowseDataModelConstructor) {
    this.id = props?.id
    this.name = props?.name
    this.vaccineDosage = props?.vaccineDosage
    this.vaccineReinforcement = props?.vaccineReinforcement
  }
}

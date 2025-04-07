import { AppFileModel } from '../../@shared/app-file.model'

export interface UserVaccineModelConstructor {
  id: number
  name: string
  vaccineDosage: { id: number; dosageDate: Date }[]
  vaccineReinforcement: { id: number; reinforcementDate: Date }[]
  documents: AppFileModel[]
}

export class UserVaccineModel {
  public readonly id: number
  public readonly name: string
  public readonly documents: AppFileModel[]
  public readonly vaccineDosage: { id: number; dosageDate: Date }[]
  public readonly vaccineReinforcement: { id: number; reinforcementDate: Date }[]

  constructor(props: UserVaccineModelConstructor) {
    this.id = props.id
    this.name = props.name
    this.documents = props.documents.map((v) => new AppFileModel(v))
    this.vaccineDosage = props.vaccineDosage
    this.vaccineReinforcement = props.vaccineReinforcement
  }
}

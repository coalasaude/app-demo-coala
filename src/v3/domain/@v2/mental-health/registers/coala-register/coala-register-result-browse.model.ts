import { AppFileModel, AppFileModelContructor } from '../../../@shared/app-file.model'

export interface MentalHealthCoalaRegisterResultBrowseModelConstructor {
  id: number
  title: string
  description: string
  file?: AppFileModelContructor
  createdAt: Date
  professional: {
    name: string
    register: string
    registerType: string
  }
}

export class MentalHealthCoalaRegisterResultBrowseModel {
  public readonly id: number
  public readonly title: string
  public readonly description: string
  public readonly file?: AppFileModel
  public readonly createdAt: Date
  public readonly professional: {
    readonly name: string
    readonly register: string
    readonly registerType: string
  }

  constructor(props: MentalHealthCoalaRegisterResultBrowseModelConstructor) {
    this.id = props.id
    this.title = props.title
    this.description = props.description
    this.professional = props.professional
    this.file = props.file ? new AppFileModel(props.file) : undefined
    this.createdAt = props.createdAt
  }
}

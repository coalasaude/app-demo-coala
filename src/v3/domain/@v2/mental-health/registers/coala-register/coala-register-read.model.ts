import { AppFileModel, AppFileModelContructor } from '../../../@shared/app-file.model'

export interface MentalHealthCoalaRegisterReadModelConstructor {
  id: number
  title: string
  description: string
  file?: AppFileModelContructor
}

export class MentalHealthCoalaRegisterReadModel {
  public readonly id: number
  public readonly title: string
  public readonly description: string
  public readonly file?: AppFileModel

  constructor(props: MentalHealthCoalaRegisterReadModelConstructor) {
    this.id = props.id
    this.title = props.title
    this.description = props.description
    this.file = props.file ? new AppFileModel(props.file) : undefined
  }
}

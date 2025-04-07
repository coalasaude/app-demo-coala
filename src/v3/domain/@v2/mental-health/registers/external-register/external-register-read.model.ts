import { ProfessionalType } from '@/types/professionalReference'

import { AppFileModel, AppFileModelContructor } from '../../../@shared/app-file.model'

export interface MentalHealthExternalRegisterReadModelConstructor {
  id: number
  title: string
  description: string
  file?: AppFileModelContructor
  profissional: {
    name: string
    type: ProfessionalType
    register: {
      id: number
      value: string
    }
  }
}

export class MentalHealthExternalRegisterReadModel {
  public readonly id: number
  public readonly title: string
  public readonly description: string
  public readonly file?: AppFileModel
  public readonly profissional: {
    name: string
    type: ProfessionalType
    register: {
      id: number
      value: string
    }
  }

  constructor(props: MentalHealthExternalRegisterReadModelConstructor) {
    this.id = props.id
    this.title = props.title
    this.description = props.description
    this.profissional = props.profissional
    this.file = props.file ? new AppFileModel(props.file) : undefined
  }
}

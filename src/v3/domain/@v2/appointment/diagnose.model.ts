import { DefaultStatus } from '@/types/status'

import { ProfessionalModel, ProfessionalModelConstructor } from './professional.model'
import { CidModel, CidModelConstructor } from './cid.model'

export enum DiagnoseType {
  HYPOTHESIS = 'HYPOTHESIS',
  FINAL = 'FINAL',
}

export interface DiagnoseModelConstructor {
  id: number
  createdAt: Date
  date: Date
  diagnoseExternal?: boolean
  status: DefaultStatus
  type: DiagnoseType
  appointmentId: number
  observation?: string
  professional: ProfessionalModelConstructor
  cid: CidModelConstructor
}

export class DiagnoseModel {
  public readonly id: number
  public readonly createdAt: Date
  public readonly date: Date
  public readonly diagnoseExternal?: boolean
  public readonly status: DefaultStatus
  public readonly type: DiagnoseType
  public readonly appointmentId: number
  public readonly professional: ProfessionalModel
  public readonly cid: CidModel
  public readonly observation?: string

  constructor(props: DiagnoseModelConstructor) {
    this.id = props.id
    this.diagnoseExternal = props.diagnoseExternal
    this.status = props.status
    this.type = props.type
    this.date = props.date
    this.observation = props.observation
    this.appointmentId = props.appointmentId
    this.createdAt = props.createdAt

    this.professional = new ProfessionalModel(props.professional)
    this.cid = new CidModel(props.cid)
  }
}

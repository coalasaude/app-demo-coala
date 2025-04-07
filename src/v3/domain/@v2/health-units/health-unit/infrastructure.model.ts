import { formatArray } from '@/v3/presentation/pages/health-unit/utils/formatters'
import {
  HEALTH_UNIT_CARE_MODALITY_DESCRIPTIONS,
  HEALTH_UNIT_PATIENT_TYPE_DESCRIPTIONS,
} from '@/v3/presentation/pages/health-unit/constants'

import { HealUnitPatientType, HealthUnitCareModality } from '../../../api/ApiHealthUnitResponse'

export type InfrastructureModelConstructor = {
  openAt?: string
  closeAt?: string
  patientType?: HealUnitPatientType[]
  careModality?: HealthUnitCareModality[]
  notes?: string
}

export class InfrastructureModel {
  readonly openAt?: string
  readonly closeAt?: string
  readonly patientType?: HealUnitPatientType[]
  careModality?: HealthUnitCareModality[]
  notes?: string

  constructor(props: InfrastructureModelConstructor) {
    this.openAt = props.openAt
    this.closeAt = props.closeAt
    this.patientType = props.patientType
    this.careModality = props.careModality
    this.notes = props.notes
  }

  get formattedTime() {
    const is24h = this.openAt === '00:00' && this.closeAt === '23:59'
    const formattedTime = is24h ? '24h' : `De ${this.openAt} às ${this.closeAt}`

    return formattedTime
  }

  get formattedPatientType() {
    return formatArray(
      this.patientType?.map((v) => HEALTH_UNIT_PATIENT_TYPE_DESCRIPTIONS[v]),
      ' e ',
    )
  }

  get formattedCareModality() {
    return formatArray(this.careModality?.map((v) => HEALTH_UNIT_CARE_MODALITY_DESCRIPTIONS[v]))
  }

  toJSON() {
    return {
      openAt: this.openAt,
      closeAt: this.closeAt,
      patientType: this.patientType,
      careModality: this.careModality,
      notes: this.notes,
    }
  }
}

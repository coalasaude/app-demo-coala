import { formatArray } from '@/v3/presentation/pages/health-unit/utils/formatters'
import {
  HEALTH_UNIT_CARE_UNITS_DESCRIPTIONS,
  HEALTH_UNIT_IMAGING_EXAMS_DESCRIPTIONS,
  HEALTH_UNIT_IMMOBILIZATION_TYPES_DESCRIPTIONS,
  HEALTH_UNIT_LABORATORY_EXAMS_DESCRIPTIONS,
} from '@/v3/presentation/pages/health-unit/constants'

import {
  HealthUnitCareUnits,
  HealthUnitImagingExams,
  HealthUnitImmobilizationTypes,
  HealthUnitLaboratoryExams,
} from '../../../api/ApiHealthUnitResponse'

export type AppointmentModelConstructor = {
  doSutures?: boolean
  doMedication?: boolean
  doSurgery?: boolean
  imagingExams?: HealthUnitImagingExams[]
  laboratoryExams?: HealthUnitLaboratoryExams[]
  careUnits?: HealthUnitCareUnits[]
  immobilizationTypes?: HealthUnitImmobilizationTypes[]
}

export class AppointmentModel {
  doSutures?: boolean
  doMedication?: boolean
  doSurgery?: boolean
  imagingExams?: HealthUnitImagingExams[]
  laboratoryExams?: HealthUnitLaboratoryExams[]
  careUnits?: HealthUnitCareUnits[]
  immobilizationTypes?: HealthUnitImmobilizationTypes[]

  constructor(props: AppointmentModelConstructor) {
    this.doSutures = props.doSutures
    this.doMedication = props.doMedication
    this.doSurgery = props.doSurgery
    this.imagingExams = props.imagingExams
    this.laboratoryExams = props.laboratoryExams
    this.careUnits = props.careUnits
    this.immobilizationTypes = props.immobilizationTypes
  }

  get formattedImagingExams() {
    return formatArray(this.imagingExams?.map((v) => HEALTH_UNIT_IMAGING_EXAMS_DESCRIPTIONS[v]))
  }

  get formattedLaboratoryExams() {
    return formatArray(
      this.laboratoryExams?.map((v) => HEALTH_UNIT_LABORATORY_EXAMS_DESCRIPTIONS[v]),
    )
  }

  get formattedCareUnits() {
    return formatArray(this.careUnits?.map((v) => HEALTH_UNIT_CARE_UNITS_DESCRIPTIONS[v]))
  }

  get formattedImmobilizationTypes() {
    return formatArray(
      this.immobilizationTypes?.map((v) => HEALTH_UNIT_IMMOBILIZATION_TYPES_DESCRIPTIONS[v]),
    )
  }

  toJSON() {
    return {
      doSutures: this.doSutures,
      doMedication: this.doMedication,
      doSurgery: this.doSurgery,
      imagingExams: this.imagingExams,
      laboratoryExams: this.laboratoryExams,
      careUnits: this.careUnits,
      immobilizationTypes: this.immobilizationTypes,
    }
  }
}

import dayjs from 'dayjs'

import { AuthorizationStatus, MedicineUsageStatus } from '@/v3/domain/medicine'

import {
  MedicineConcentrationUnitModel,
  MedicineConcentrationUnitModelConstructor,
} from './medicine-concentration-unit.model'
import { MedicineModel } from './medicine.model'

export interface MedicineBrowseDataModelConstructor {
  id: number
  name: string
  validUntil?: Date
  startDate?: Date
  startHour?: number
  concentration?: number
  createdAt: Date
  emissionDate?: Date

  isContinuousUsage: boolean
  authorizationStatus: AuthorizationStatus
  isSOS: boolean
  usageStatus?: MedicineUsageStatus

  medicineConcentrationUnit: MedicineConcentrationUnitModelConstructor
}

export class MedicineBrowseDataModel {
  public readonly id: number
  public readonly name: string
  public readonly startDate?: Date
  public readonly validUntil?: Date
  public readonly startHour?: number
  public readonly createdAt: Date
  public readonly concentration?: number
  public readonly isContinuousUsage: boolean
  public readonly isSOS: boolean
  public readonly authorizationStatus: AuthorizationStatus
  public readonly medicineConcentrationUnit: MedicineConcentrationUnitModelConstructor
  public readonly emissionDate?: Date
  public readonly usageStatus?: MedicineUsageStatus

  constructor(props: MedicineBrowseDataModelConstructor) {
    this.id = props.id
    this.name = props.name
    this.concentration = props.concentration
    this.validUntil = props.validUntil
    this.startDate = props.startDate
    this.startHour = props.startHour
    this.createdAt = props.createdAt
    this.authorizationStatus = props.authorizationStatus
    this.isSOS = props.isSOS
    this.isContinuousUsage = props.isContinuousUsage
    this.medicineConcentrationUnit = new MedicineConcentrationUnitModel(
      props.medicineConcentrationUnit,
    )
    this.emissionDate = props.emissionDate
    this.usageStatus = props.usageStatus
  }

  getConcentrationString() {
    return MedicineModel.getConcentrationString({
      concentration: this.concentration,
      concentrationUnitName: this.medicineConcentrationUnit?.name,
    })
  }

  getTreatmentsDays() {
    return MedicineModel.getTreatmentsDays(this)
  }

  getUsageString() {
    if (this.isContinuousUsage) {
      return 'Contínuo'
    } else if (this.validUntil) {
      const daysTreatment = this.getTreatmentsDays()
      const isPlural = daysTreatment > 1
      return `Por ${daysTreatment} dia${isPlural ? 's' : ''}`
    }

    return ''
  }

  getUsageInitDateString() {
    const text = []

    if (this.isSOS) {
      return 'SOS'
    }
    if (this.startDate) {
      text.push(dayjs(this.startDate).format('DD.MM.YYYY'))
    }
    if (this.startHour) {
      text.push(
        dayjs()
          .set('hour', this.startHour || 0)
          .set('minute', 0)
          .format('HH:mm'),
      )
    }

    return text.join('\n')
  }

  getFormattedEmissionDate() {
    if (!this.emissionDate) {
      return '-'
    }
    return dayjs(this.emissionDate).format('DD.MM.YYYY')
  }

  getIsStoppedMedicine(): boolean {
    return this.usageStatus === MedicineUsageStatus.STOPPED
  }
}

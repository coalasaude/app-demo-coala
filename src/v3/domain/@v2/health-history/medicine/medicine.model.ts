import dayjs from 'dayjs'

import { AuthorizationStatus, MedicineUsageStatus } from '@/v3/domain/medicine'

import { AppFileModel } from '../../@shared/app-file.model'
import { UserModel } from '../../users/users.model'

import {
  MedicineConcentrationUnitModel,
  MedicineConcentrationUnitModelConstructor,
} from './medicine-concentration-unit.model'
import {
  MedicineDosageUnitModel,
  MedicineDosageUnitModelConstructor,
} from './medicine-dosage-unit.model'
import { PrescriptionModel } from './prescription.model'
import {
  ScheduledMedicineModel,
  ScheduledMedicineModelConstructor,
} from './scheduled-medicine.model'

export interface MedicineModelConstructor {
  id: number
  name: string
  validUntil?: Date
  startDate?: Date
  startHour?: number
  observation?: string
  concentration?: number
  authorizationStatus: AuthorizationStatus
  recommendation?: string
  createdAt: Date
  dosage: number

  isFromAppointment: boolean
  isPendingApprovement: boolean
  isContinuousUsage: boolean
  isSOS: boolean

  medicineConcentrationUnit: MedicineConcentrationUnitModelConstructor
  medicineDosageUnit: MedicineDosageUnitModelConstructor
  scheduledMedicine: ScheduledMedicineModelConstructor
  prescription: PrescriptionModel
  document?: AppFileModel
  usageStatus: MedicineUsageStatus
  userCreator?: UserModel
}

export class MedicineModel {
  public readonly id: number
  public readonly dosage: number
  public readonly name: string
  public readonly validUntil?: Date
  public readonly createdAt: Date
  public readonly startHour?: number
  public readonly startDate?: Date
  public readonly concentration?: number
  public readonly observation?: string
  public readonly recommendation?: string
  public readonly authorizationStatus: AuthorizationStatus

  public readonly isFromAppointment: boolean
  public readonly isContinuousUsage: boolean
  public readonly isSOS: boolean
  public readonly isPendingApprovement: boolean

  public readonly document?: AppFileModel
  public readonly prescription: PrescriptionModel
  public readonly medicineConcentrationUnit: MedicineConcentrationUnitModelConstructor
  public readonly medicineDosageUnit: MedicineDosageUnitModelConstructor
  public readonly scheduledMedicine: ScheduledMedicineModelConstructor
  public readonly usageStatus: MedicineUsageStatus
  public readonly userCreator?: UserModel

  constructor(props: MedicineModelConstructor) {
    this.id = props.id
    this.name = props.name
    this.concentration = props.concentration
    this.validUntil = props.validUntil
    this.startDate = props.startDate
    this.startHour = props.startHour
    this.authorizationStatus = props.authorizationStatus
    this.dosage = props.dosage
    this.observation = props.observation
    this.recommendation = props.recommendation
    this.createdAt = props.createdAt

    this.isFromAppointment = props.isFromAppointment
    this.isSOS = props.isSOS
    this.isPendingApprovement = props.isPendingApprovement
    this.isContinuousUsage = props.isContinuousUsage
    this.usageStatus = props.usageStatus

    this.prescription = new PrescriptionModel(props.prescription)
    this.medicineDosageUnit = new MedicineDosageUnitModel(props.medicineDosageUnit)
    this.userCreator = props.userCreator
    this.scheduledMedicine = new ScheduledMedicineModel(props.scheduledMedicine)
    this.document = props.document ? new AppFileModel(props.document) : undefined
    this.medicineConcentrationUnit = new MedicineConcentrationUnitModel(
      props.medicineConcentrationUnit,
    )
  }

  getHourDate() {
    return this.startHour !== undefined
      ? dayjs().set('h', this.startHour).set('minute', 0).set('s', 0).set('millisecond', 0).toDate()
      : null
  }

  getStartHour() {
    return dayjs(this.getHourDate()).format('HH:mm')
  }

  getDosageString() {
    const includeSpace = !['ml', 'mg'].includes(this.medicineDosageUnit?.name || '')
    return `${this.dosage || ''}${includeSpace ? ' ' : ''}${this.medicineDosageUnit?.name || ''}`
  }

  getFrequency() {
    return this.scheduledMedicine?.name || ''
  }

  getStartDate() {
    if (!this.startDate) return ''
    return dayjs(this.startDate).format('DD/MM/YYYY')
  }

  getPackagePhoto() {
    return {
      url: this.document?.url,
      name: this.document?.fileName,
    }
  }

  getPrescriptionFile() {
    return {
      url: this.prescription?.document?.url,
      name: this.prescription?.document?.fileName,
    }
  }

  getTreatmentsDays() {
    return MedicineModel.getTreatmentsDays(this)
  }

  getConcentrationString() {
    return MedicineModel.getConcentrationString({
      concentration: this.concentration,
      concentrationUnitName: this.medicineConcentrationUnit?.name,
    })
  }

  getMedicineStatusLabel() {
    if (this.usageStatus === MedicineUsageStatus.VALID) return 'Vigente'
    if (this.usageStatus === MedicineUsageStatus.INVALID) return 'Não vigente'
    if (this.usageStatus === MedicineUsageStatus.STOPPED) return 'Parou o uso'
    return '-'
  }

  static getConcentrationString(props: { concentration?: number; concentrationUnitName: string }) {
    const includeSpace = !['ml', 'mg'].includes(props.concentrationUnitName || '')
    return `${props.concentration || ''}${includeSpace ? ' ' : ''}${
      props.concentrationUnitName || ''
    }`
  }

  static getTreatmentsDays(props: {
    validUntil?: Date
    startDate?: Date
    createdAt: Date
    isContinuousUsage: boolean
  }) {
    if (props.isContinuousUsage) return 0
    const createdAt = dayjs(props.createdAt).startOf('day')
    return props.validUntil ? dayjs(props.validUntil).diff(createdAt, 'days') : 0
  }

  getAuthorizationStatusText() {
    if (this.authorizationStatus === AuthorizationStatus.NOT_AUTHORIZED) return 'Não'
    if (
      this.authorizationStatus === AuthorizationStatus.AUTHORIZED_SCHOOL ||
      this.authorizationStatus === AuthorizationStatus.AUTHORIZED
    )
      return 'Sim'
    return '-'
  }
}

import dayjs from 'dayjs'

type MedicineDataModelConstructor = {
  name: string
  id: number
}

export interface MedicineModelConstructor {
  id: number
  dosage: number
  name: string
  validUntil: Date
  createdAt: Date
  concentration: number
  recommendation?: string
  observation?: string

  dosageDescription?: string
  concentrationDescription?: string

  concentrationUnit: MedicineDataModelConstructor
  dosageUnit: MedicineDataModelConstructor
  scheduledMedicine?: MedicineDataModelConstructor
}

export class MedicineModel {
  public readonly id: number
  public readonly dosage: number
  public readonly name: string
  public readonly validUntil: Date
  public readonly createdAt: Date
  public readonly concentration: number
  public readonly recommendation?: string
  public readonly observation?: string
  public readonly dosageDescription?: string
  public readonly concentrationDescription?: string
  public readonly concentrationUnit: MedicineDataModelConstructor
  public readonly dosageUnit: MedicineDataModelConstructor
  public readonly scheduledMedicine?: MedicineDataModelConstructor

  constructor(props: MedicineModelConstructor) {
    this.id = props.id
    this.name = props.name
    this.validUntil = props.validUntil
    this.createdAt = props.createdAt
    this.observation = props.observation
    this.concentration = props.concentration
    this.dosage = props.dosage
    this.recommendation = props.recommendation

    this.dosageUnit = props.dosageUnit
    this.scheduledMedicine = props.scheduledMedicine
    this.concentrationUnit = props.concentrationUnit

    this.concentrationDescription = props.concentrationDescription
    this.dosageDescription = props.dosageDescription
  }

  get medicineDays() {
    return dayjs(this.validUntil).diff(dayjs(this.createdAt), 'day') + 1
  }
}

export interface ScheduledMedicineModelConstructor {
  id: number
  name: string
  hour?: number
}

export class ScheduledMedicineModel {
  public readonly id: number
  public readonly name: string
  public readonly hour?: number

  constructor(props: ScheduledMedicineModel) {
    this.id = props.id
    this.name = props.name
    this.hour = props.hour
  }
}

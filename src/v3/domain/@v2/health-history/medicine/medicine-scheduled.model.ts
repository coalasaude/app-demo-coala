export interface MedicineScheduledModelConstructor {
  id: number
  name: string
  hour: number
}

export class MedicineScheduledModel {
  id: number
  name: string
  hour: number

  constructor(props: MedicineScheduledModelConstructor) {
    this.id = props.id
    this.name = props.name
    this.hour = props.hour
  }
}

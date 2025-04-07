export interface MedicineConcentrationUnitModelConstructor {
  id: number
  name: string
}

export class MedicineConcentrationUnitModel {
  id: number
  name: string

  constructor(props: MedicineConcentrationUnitModelConstructor) {
    this.id = props.id
    this.name = props.name
  }
}

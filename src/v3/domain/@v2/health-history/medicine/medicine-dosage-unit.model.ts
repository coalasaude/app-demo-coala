export interface MedicineDosageUnitModelConstructor {
  id: number
  name: string
}

export class MedicineDosageUnitModel {
  id: number
  name: string

  constructor(props: MedicineDosageUnitModelConstructor) {
    this.id = props.id
    this.name = props.name
  }
}

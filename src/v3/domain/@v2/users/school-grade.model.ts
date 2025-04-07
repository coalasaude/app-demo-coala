export type SchoolGradeModelConstructor = {
  id: number
  name: string
}

export class SchoolGradeModel {
  public readonly id: number
  public readonly name: string

  constructor(params: SchoolGradeModelConstructor) {
    this.id = params.id
    this.name = params.name
  }
}

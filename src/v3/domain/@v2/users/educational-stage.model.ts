export type EducationalStageModelConstructor = {
  id: number
  name: string
  abbreviation: string
}

export class EducationalStageModel {
  public readonly id: number
  public readonly name: string
  public readonly abbreviation: string

  constructor(params: EducationalStageModelConstructor) {
    this.id = params.id
    this.name = params.name
    this.abbreviation = params.abbreviation
  }
}

export interface CidModelConstructor {
  id: number
  code: string
  codeDescription: string
}

export class CidModel {
  public readonly id: number
  public readonly code: string
  public readonly codeDescription: string

  constructor(props: CidModelConstructor) {
    this.id = props.id
    this.code = props.code
    this.codeDescription = props.codeDescription
  }

  get label() {
    return `${this.codeDescription} (${this.code})`
  }
}

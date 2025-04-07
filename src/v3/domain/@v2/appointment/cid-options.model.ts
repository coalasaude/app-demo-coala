export interface CidOptionsModelConstructor {
  id: number
  code: string
  codeDescription: string
}

export class CidOptionsModel {
  public readonly id: number
  public readonly code: string
  public readonly codeDescription: string

  constructor(props: CidOptionsModelConstructor) {
    this.id = props.id
    this.code = props.code
    this.codeDescription = props.codeDescription
  }

  get label() {
    return `${this.code} - ${this.codeDescription}`
  }
}

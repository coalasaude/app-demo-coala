export type DocumentModelConstructor = {
  id: number
  url: string
}

export class DocumentModel {
  public readonly id: number
  public readonly url: string

  constructor(props: DocumentModelConstructor) {
    this.id = props.id
    this.url = props.url
  }
}

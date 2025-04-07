export interface DocumentModelConstructor {
  id: number
  url: string
  fileName: string
}

export class DocumentModel {
  public id: number
  public url: string
  public fileName: string

  constructor(data: DocumentModelConstructor) {
    this.id = data.id
    this.url = data.url
    this.fileName = data.fileName
  }
}

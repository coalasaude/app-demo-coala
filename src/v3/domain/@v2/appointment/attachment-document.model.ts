export interface AttachmentDocumentModelConstructor {
  id: number
  url: string
  fileName: string
}

export class AttachmentDocumentModel {
  public id: number
  public url: string
  public fileName: string

  constructor(data: AttachmentDocumentModelConstructor) {
    this.id = data.id
    this.url = data.url
    this.fileName = data.fileName
  }
}

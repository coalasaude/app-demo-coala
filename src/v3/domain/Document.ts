export interface TDocument {
  id: number
  documentUrl: string
  bucketName: string
  filename: string
  pin: number | null
  created_at: Date
  updated_at: Date | null
}

export class Document {
  id: number
  documentUrl: string
  bucketName: string
  filename: string
  pin: number | null
  createdAt: Date
  updatedAt: Date | null

  constructor(params: TDocument) {
    this.id = params.id
    this.documentUrl = params.documentUrl
    this.bucketName = params.bucketName
    this.filename = params.filename
    this.pin = params.pin
    this.createdAt = params.created_at
    this.updatedAt = params.updated_at
  }
}

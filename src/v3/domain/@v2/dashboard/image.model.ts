export type ImageModelConstructor = {
  url?: string
  fileName: string
  bucket?: string
}

export class ImageModel {
  url?: string
  fileName: string
  bucket?: string

  constructor(params: ImageModelConstructor) {
    this.url = params.url
    this.fileName = params.fileName
    this.bucket = params.bucket
  }
}

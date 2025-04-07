type ImageConstructor = {
  url?: string
  fileName: string
  bucket?: string
}

export class Image {
  url: string
  fileName: string
  bucket?: string

  constructor(params: ImageConstructor) {
    this.url = params.url || ''
    this.fileName = params.fileName
    this.bucket = params.bucket
  }
}

export interface AppFileModelContructor {
  url: string
  fileName: string
}
export class AppFileModel {
  public readonly url: string
  public readonly fileName: string

  constructor(data: AppFileModelContructor) {
    this.url = data.url
    this.fileName = data.fileName
  }

  get formattedName() {
    return this.fileName.split('/').at(-1)
  }
}

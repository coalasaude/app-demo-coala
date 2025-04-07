import { ImageModel, ImageModelConstructor } from './image.model'

export type GetCurrentCourseModelConstructor = {
  id: number
  course: string
  image?: ImageModelConstructor
  progress: number
}

export class GetCurrentCourseModel {
  public readonly id: number
  public readonly course: string
  public readonly image?: ImageModel
  public readonly progress: number

  constructor(data: GetCurrentCourseModelConstructor) {
    this.id = data.id
    this.course = data.course
    this.image = data.image ? new ImageModel(data.image) : undefined
    this.progress = data.progress
  }
}

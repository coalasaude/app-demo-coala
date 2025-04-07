export type LikeConstructor = {
  id: number
  userId: number
  createdAt: Date
}

export class LikeBrowseOutput {
  id: number
  userId: number
  createdAt: Date

  constructor(params: LikeConstructor) {
    this.id = params.id || -1
    this.userId = params.userId || -1
    this.createdAt = params.createdAt || new Date()
  }
}

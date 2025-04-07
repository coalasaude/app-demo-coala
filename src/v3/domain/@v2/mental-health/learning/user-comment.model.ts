export type UserCommentConstructor = {
  id: number
  name: string
  avatar: string
}

export class UserComment {
  id: number
  name: string
  avatar: string

  constructor(params: UserCommentConstructor) {
    this.id = params.id
    this.name = params.name
    this.avatar = params.avatar
  }
}

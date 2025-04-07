export type CreatorConstructor = {
  id: number
  fullName: string
  profileName?: string
}

export class Creator {
  id: number
  fullName: string
  profileName?: string

  constructor(params: CreatorConstructor) {
    this.id = params.id
    this.fullName = params.fullName
    this.profileName = params.profileName
  }
}

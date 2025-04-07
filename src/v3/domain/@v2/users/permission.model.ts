export interface PermissionModelConstructor {
  id?: number
  name: string
  description?: string
}

export class PermissionModel {
  public readonly id?: number
  public readonly name: string
  public readonly description?: string

  constructor(data: PermissionModelConstructor) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
  }
}

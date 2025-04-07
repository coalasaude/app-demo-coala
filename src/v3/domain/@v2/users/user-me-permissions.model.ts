import { PermissionCategory } from '@/types/permissions'

export interface MePermissionsConstructor {
  id: number
  name: string
  description: string
  categoryId: number
  category?: PermissionCategory
  institution_id?: number
}

export class MePermissions {
  public readonly id: number
  public readonly name: string
  public readonly description: string
  public readonly categoryId: number
  public readonly category?: PermissionCategory
  public readonly institution_id?: number

  constructor(data: MePermissionsConstructor) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.categoryId = data.categoryId
    this.category = data.category
    this.institution_id = data.institution_id
  }
}

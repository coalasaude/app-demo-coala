export interface Permissions {
  id: number
  name: string
  description: string
  categoryId: number
  category?: PermissionCategory
  institution_id?: number
}

export interface PermissionCategory {
  id: number
  name: string
  description: string
  permissions: Permissions[]
}

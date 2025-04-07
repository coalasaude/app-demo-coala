import apiRequest from '../../../api'

export type ResponsiblePayload =
  | {
      email?: string
      telephone: string
      name: string
      lastName: string
    }
  | {
      email: string
      telephone?: string
      name: string
      lastName: string
    }

export type ChildPayload =
  | {
      id: number
    }
  | {
      name: string
      lastName: string
    }

export interface RolePayload {
  profileId: number
  institutionId: number
}

export interface AddChildrenPayload {
  role: RolePayload
  children: ChildPayload[]
  responsible: ResponsiblePayload[]
}

export async function addChildren(params: AddChildrenPayload) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/children',
    body: {
      ...params,
      responsible: params.responsible.map((responsible) => ({
        ...responsible,
        email: responsible.email || undefined,
        telephone: responsible.telephone || undefined,
      })),
    },
  })
}

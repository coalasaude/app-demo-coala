import { TApiUserResponse } from '@/v3/domain/api/ApiUserResponse'

import apiRequest from '../api'

export interface AddResponsiblePayload {
  email?: string
  telephone?: string
  name: string
  lastName: string
}

export interface AddChildrenWithResponsible {
  name: string
  dependent_id?: number
  lastName: string
}

export interface UsersAndResponsible {
  children: AddChildrenWithResponsible
  responsible: AddResponsiblePayload[]
}

export interface AddUserWithResponsiblePayload {
  institutionId: number
  users: UsersAndResponsible[]
}

export const addUserWithResponsible = (payload: AddUserWithResponsiblePayload) =>
  apiRequest<TApiUserResponse>({
    method: 'POST',
    throwError: true,
    path: `user/responsable`,
    headers: {
      'x-institution-id': payload.institutionId,
      'x-children-id': undefined,
      'x-self-access': undefined,
    },
    body: {
      ...payload,
      users: payload.users.map((user) => ({
        ...user,
        responsable: user.responsible.map((responsible) => ({
          ...responsible,
          email: responsible.email || undefined,
          telephone: responsible.telephone || undefined,
        })),
      })),
    },
  })

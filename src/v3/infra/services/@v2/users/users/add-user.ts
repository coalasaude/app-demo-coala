import apiRequest from '../../../api'

export interface LinkRolePayload {
  profileId: number
  institutionId?: number
  healthRegister?: string
  class?: string
  enrollment?: string
  companyPositionId?: number
  educationalStageId?: number
  schoolGradeId?: number
}

export type AddUserPayload =
  | {
      email?: string
      telephone: string
      cpf?: string
      name: string
      lastName: string
      role?: LinkRolePayload
    }
  | {
      email: string
      telephone?: string
      name: string
      cpf?: string
      lastName: string
      role?: LinkRolePayload
    }

export async function addUser(params: AddUserPayload) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users',
    body: params,
  })
}

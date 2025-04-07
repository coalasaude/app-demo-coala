import { Genre } from '@/types/genre'

import apiRequest from '../../../api'

export type EditUserPayload = {
  email?: string | null
  telephone?: string | null
  name?: string
  lastName?: string
  cpf?: string | null
  socialName?: string | null
  birthday?: Date | null
  genre?: Genre | null
  userId: number
  deniesAllergies?: boolean
}

export async function editUser(params: EditUserPayload) {
  const { userId, ...body } = params
  await apiRequest({
    method: 'PATCH',
    throwError: true,
    path: 'v2/users/:userId',
    body,
    pathParams: {
      userId,
    },
  })
}

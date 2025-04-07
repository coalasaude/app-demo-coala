import apiRequest from '../../../api'

export type AddResponsiblePayload = {
  email?: string
  telephone?: string
  name: string
  lastName: string
  childId: number
}

export async function addResponsible(params: AddResponsiblePayload) {
  const { childId, ...body } = params
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/responsible',
    body: body,
    pathParams: {
      userId: childId,
    },
  })
}

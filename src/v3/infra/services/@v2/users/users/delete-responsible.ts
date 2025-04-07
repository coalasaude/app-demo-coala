import apiRequest from '../../../api'

export interface DeleteResponsibleParams {
  childrenId: number
  responsibleId: number
}

export async function deleteResponsibleUser({
  childrenId,
  responsibleId,
}: DeleteResponsibleParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/users/:userId/responsible/:responsibleId',
    pathParams: { userId: childrenId, responsibleId },
  })
}

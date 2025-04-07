import apiRequest from '../../../api'

export interface DeleteUserProfessionalReferenceParams {
  professionalReferenceId: number
  userId: number
}

export async function deleteProfessionalReference({
  userId,
  professionalReferenceId,
}: DeleteUserProfessionalReferenceParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/users/:userId/professional-references/:professionalReferenceId',
    pathParams: { userId, professionalReferenceId },
  })
}

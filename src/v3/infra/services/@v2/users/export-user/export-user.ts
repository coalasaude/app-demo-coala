import apiRequest from '../../../api'

export type ExportUserParams = {
  institutionId: number
}

export async function exportUsers(params: ExportUserParams) {
  const { institutionId } = params

  await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/users/export',
    queryParams: { institutionId },
  })
}

import apiRequest from '../../../api'

export type UnlinkInstitutionParams = {
  healthUnitId?: number
  institutionId?: number
}

export async function unlinkInstitution(params: UnlinkInstitutionParams) {
  await apiRequest<void>({
    method: 'DELETE',
    throwError: true,
    path: 'v2/health-units/:healthUnitId/institutions/:institutionId',
    pathParams: params,
  })
}

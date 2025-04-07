import apiRequest from '../../../api'

export type LinkInstitutionParams = {
  healthUnitId?: number
  institutionId?: number
}

export async function linkInstitution(params: LinkInstitutionParams) {
  await apiRequest<void>({
    method: 'POST',
    throwError: true,
    path: 'v2/health-units/:healthUnitId/institutions/:institutionId',
    pathParams: params,
  })
}

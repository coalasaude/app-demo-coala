import apiRequest from '../../../api'

export interface AddDiseaseParams {
  userId: number
  diagnoseDate: Date
  cidId?: number
  otherDisease?: string
  observation?: string
  treatmentPerformed: boolean
  file?: File | null
}

export async function addDisease({ userId, ...params }: AddDiseaseParams) {
  const formData = new FormData()

  formData.append('diagnoseDate', String(params.diagnoseDate))
  formData.append('treatmentPerformed', String(params.treatmentPerformed))
  if (params.observation) formData.append('observation', params.observation)
  if (params.otherDisease) formData.append('otherDisease', params.otherDisease)
  if (params.cidId) formData.append('cidId', String(params.cidId))
  if (params.file) formData.append('file', params.file)

  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/health-history/diseases',
    body: formData,
    cType: 'multipart/form-data',
    pathParams: { userId },
  })
}

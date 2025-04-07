import apiRequest from '../../../api'

export interface EditUserDiseaseParams {
  diseaseId: number
  userId: number
  diagnoseDate?: Date
  cidId?: number
  otherDisease?: string
  observation?: string
  treatmentPerformed?: boolean
  file?: File
}

export async function editDisease({ userId, diseaseId, ...params }: EditUserDiseaseParams) {
  const formData = new FormData()

  if (params.file) formData.append('file', params.file)
  if (params.diagnoseDate) formData.append('diagnoseDate', String(params.diagnoseDate))
  if (params.observation) formData.append('observation', params.observation)
  if (params.otherDisease) formData.append('otherDisease', params.otherDisease)
  if (params.cidId) formData.append('cidId', String(params.cidId))
  if (params.treatmentPerformed)
    formData.append('treatmentPerformed', String(params.treatmentPerformed))

  await apiRequest({
    method: 'PATCH',
    throwError: true,
    path: 'v2/users/:userId/health-history/diseases/:diseaseId',
    body: formData,
    cType: 'multipart/form-data',
    pathParams: { userId, diseaseId },
  })
}

import apiRequest from '../../../api'

export interface AddUserHealthInsuranceParams {
  userId: number
  insuranceCompany: string
  code: string
  plan: string
  validUntil: Date
  file: File
}

export async function addHealthInsurance({ userId, ...params }: AddUserHealthInsuranceParams) {
  const formData = new FormData()

  formData.append('file', params.file)
  formData.append('insuranceCompany', params.insuranceCompany)
  formData.append('code', params.code)
  formData.append('plan', params.plan)
  formData.append('validUntil', String(params.validUntil))

  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/health-insurances',
    body: formData,
    cType: 'multipart/form-data',
    pathParams: { userId },
  })
}

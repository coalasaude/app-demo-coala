import apiRequest from '../../../api'

export interface AddVaccineParams {
  vaccineId: number
  dosage: Date[]
  reinforcement: Date[]
}

export interface AddVaccineWithComprovantParams {
  userId: number
  documentId: number
  vaccines: AddVaccineParams[]
}

export async function addVaccineWithComprovant({
  userId,
  ...body
}: AddVaccineWithComprovantParams) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/health-history/vaccine/comprovant',
    body,
    pathParams: { userId },
  })
}

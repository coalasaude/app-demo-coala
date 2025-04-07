import { CalendarSettingsDays, FrequencyInterval } from '@/constants/mentalHealth'
import apiRequest from '@/services/api'

export type UpdatePeiPdiParams = {
  peiPdiId: number
  userId: number
  name?: string
  responsibleCollaboratorId: number
  patientId: number
  frequency?: FrequencyInterval
  day?: CalendarSettingsDays[]
  duration?: number
  patientBirthday?: Date
  patientAge?: number
  conditionSuspicions?: string
  difficulties?: string
  generalObjectives?: string
  description?: string
}

export async function updatePeiPdi(params: UpdatePeiPdiParams) {
  await apiRequest({
    method: 'PATCH',
    throwError: true,
    path: 'v2/users/:userId/mental-health/plan/:id',
    pathParams: { userId: params.userId, id: params.peiPdiId },
    body: params,
  })
}

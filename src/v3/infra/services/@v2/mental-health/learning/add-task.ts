import apiRequest from '@/services/api'

type AddPeiPdiResponse = { id: number }

export type MentalHealthTaskParams = {
  categoryId: number
  subCategoryId: number
  objective?: string | null
  activities?: string | null
  adaptations?: string | null
  supportTechnologies?: string | null
  assessment?: string | null
  planId?: number
  patientId: number
}

export async function addTask(params: MentalHealthTaskParams) {
  const task = (await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/mental-health/:planId/task',
    pathParams: { userId: params.patientId, planId: Number(params.planId) },
    body: params,
  })) as AddPeiPdiResponse

  return task
}

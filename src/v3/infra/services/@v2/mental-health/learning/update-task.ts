import { MentalHealthTaskStatus } from '@/constants/mentalHealth'
import apiRequest from '@/services/api'

export type MentalHealthTaskParams = {
  taskStatus?: MentalHealthTaskStatus
  patientId: number
  taskId: number
  subCategoryId?: number
  objective?: string
  description?: string
  activities?: string
  adaptations?: string
  supportTechnologies?: string
  assessment?: string
}

export async function updateTask(params: MentalHealthTaskParams) {
  const userId = Number(params.patientId)
  const taskId = Number(params.taskId)

  const task = await apiRequest({
    method: 'PUT',
    throwError: true,
    path: 'v2/users/:userId/mental-health/task/:taskId',
    pathParams: { userId, taskId },
    body: params,
  })

  return task
}

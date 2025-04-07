import apiRequest from '@/services/api'

export type DeleteTaskParams = {
  taskId: number
  userId: number
}

export async function deleteTask(params: DeleteTaskParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/users/:userId/mental-health/task/:taskId',
    pathParams: { userId: params.userId, taskId: params.taskId },
  })
}

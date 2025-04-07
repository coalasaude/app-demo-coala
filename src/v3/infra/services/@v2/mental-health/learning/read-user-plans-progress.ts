import apiRequest from '@/services/api'
import {
  ReadUserPlansProgress,
  ReadUserPlansProgressConstructor,
} from '@/v3/domain/@v2/mental-health/learning/read-user-plans-progress.model'

type ReadUserPlansProgressParams = {
  userId: number
}

type ReadUserPlansProgressResponse = ReadUserPlansProgressConstructor

export async function readUserPlansProgress(params: ReadUserPlansProgressParams) {
  const plansProgressPercent = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/mental-health/plans-progress',
    pathParams: { userId: params.userId },
  })) as ReadUserPlansProgressResponse

  return new ReadUserPlansProgress(plansProgressPercent)
}

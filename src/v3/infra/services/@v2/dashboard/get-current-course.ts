import {
  GetCurrentCourseModel,
  GetCurrentCourseModelConstructor,
} from '@/v3/domain/@v2/dashboard/get-current-course.model'

import apiRequest from '../../api'

import { DashBoardRoutes } from './dashboard.routes'

export type GetCurrentCourseModelResponse = GetCurrentCourseModelConstructor[]

export async function getCurrentCourses() {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: DashBoardRoutes.GET_CURRENT_COURSE,
  })) as GetCurrentCourseModelResponse

  return data.map((prop) => new GetCurrentCourseModel(prop))
}

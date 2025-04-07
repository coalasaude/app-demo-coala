import {
  SchoolGradeModel,
  SchoolGradeModelConstructor,
} from '@/v3/domain/@v2/users/school-grade.model'

import apiRequest from '../../../api'

type BrowseSchoolGradeResponse = SchoolGradeModelConstructor[]

export interface BrowseUserSchoolGradeParams {
  educationalStageId?: number
}

export async function browseSchoolGrade({ educationalStageId }: BrowseUserSchoolGradeParams) {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/school-grades',
    queryParams: { educationalStageId },
  })) as BrowseSchoolGradeResponse

  return data.map((item) => new SchoolGradeModel(item))
}

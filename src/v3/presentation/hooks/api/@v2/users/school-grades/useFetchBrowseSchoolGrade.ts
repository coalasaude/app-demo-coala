import {
  browseSchoolGrade,
  BrowseUserSchoolGradeParams,
} from '@/v3/infra/services/@v2/users/school-grades/browse-school-grades'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useFetch } from '@/v3/presentation/hooks/api/@v2/@shared/useFetch'

export const useFetchBrowseSchoolGrade = (params: BrowseUserSchoolGradeParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => browseSchoolGrade(params),
    queryKey: [QueryKeyEnum.SCHOOL_GRADE, params],
  })

  return {
    ...response,
    schoolGrades: data,
  }
}

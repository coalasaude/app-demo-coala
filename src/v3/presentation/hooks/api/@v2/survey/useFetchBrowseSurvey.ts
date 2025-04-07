import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { browseSurvey, BrowseSurveyParams } from '@/v3/infra/services/@v2/survey/browse-survey'

import { useFetch } from '../@shared/useFetch'

export const useFetchBrowseSurveys = (params?: BrowseSurveyParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => {
      return browseSurvey(params)
    },
    queryKey: [QueryKeyEnum.SURVEY, params],
    refetchOnMount: true,
  })

  return {
    ...response,
    surveys: data,
  }
}

import { browseEducationalStage } from '@/v3/infra/services/@v2/users/education-stages/browse-education-stages'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useFetch } from '@/v3/presentation/hooks/api/@v2/@shared/useFetch'

export const useFetchBrowseEducationalStage = () => {
  const { data, ...response } = useFetch({
    queryFn: () => browseEducationalStage(),
    queryKey: [QueryKeyEnum.EDUCATIONAL_STAGE],
  })

  return {
    ...response,
    educationalStages: data,
  }
}

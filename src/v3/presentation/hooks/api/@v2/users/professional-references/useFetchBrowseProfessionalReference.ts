import {
  browseProfessionalReference,
  BrowseUserProfessionalReferenceParams,
} from '@/v3/infra/services/@v2/users/professional-references/browse-professional-reference'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useFetch } from '../../@shared/useFetch'

export const useFetchBrowseProfessionalReference = (
  params: BrowseUserProfessionalReferenceParams,
) => {
  const { data, ...response } = useFetch({
    queryFn: () => browseProfessionalReference(params),
    queryKey: [QueryKeyEnum.PROFESSIONAL_REFERENCE, params.userId],
  })

  return {
    ...response,
    professionalReferences: data,
  }
}

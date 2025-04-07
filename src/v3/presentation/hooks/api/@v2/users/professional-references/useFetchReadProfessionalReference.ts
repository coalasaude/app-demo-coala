import {
  readProfessionalReference,
  ReadUserProfessionalReferenceParams,
} from '@/v3/infra/services/@v2/users/professional-references/read-professional-reference'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useFetch } from '../../@shared/useFetch'

export const useFetchReadProfessionalReference = (params: ReadUserProfessionalReferenceParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => readProfessionalReference(params),
    queryKey: [QueryKeyEnum.PROFESSIONAL_REFERENCE, params.userId, params.professionalReferenceId],
  })

  return {
    ...response,
    professionalReference: data,
  }
}

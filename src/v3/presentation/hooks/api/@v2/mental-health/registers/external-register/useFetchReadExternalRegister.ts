import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  readMentalHealthExternalRegister,
  ReadMentalHealthExternalRegisterParams,
} from '@/v3/infra/services/@v2/mental-health/registers/external-register/read-external-register'

import { useFetch } from '../../../@shared/useFetch'

export const useFetchReadMentalHealthExternalRegister = (
  params: ReadMentalHealthExternalRegisterParams,
) => {
  const { data, ...response } = useFetch({
    queryFn: () => readMentalHealthExternalRegister(params),
    queryKey: [QueryKeyEnum.MENTAL_HEALTH_REGISTER_EXTERNAL_REGISTER, params.userId, params],
  })

  return {
    ...response,
    externalRegister: data,
  }
}

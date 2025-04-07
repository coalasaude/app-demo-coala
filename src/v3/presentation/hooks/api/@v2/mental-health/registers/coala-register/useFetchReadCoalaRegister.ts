import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  readMentalHealthCoalaRegister,
  ReadMentalHealthCoalaRegisterParams,
} from '@/v3/infra/services/@v2/mental-health/registers/coala-register/read-coala-register'

import { useFetch } from '../../../@shared/useFetch'

export const useFetchReadMentalHealthCoalaRegister = (
  params: ReadMentalHealthCoalaRegisterParams,
) => {
  const { data, ...response } = useFetch({
    queryFn: () => readMentalHealthCoalaRegister(params),
    queryKey: [QueryKeyEnum.MENTAL_HEALTH_REGISTER_COALA_REGISTER, params.userId, params],
  })

  return {
    ...response,
    coalaRegister: data,
  }
}

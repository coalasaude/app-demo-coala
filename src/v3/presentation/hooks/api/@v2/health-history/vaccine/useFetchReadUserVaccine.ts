import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  readUserVaccine,
  ReadUserVaccineParams,
} from '@/v3/infra/services/@v2/health-history/vaccine/read-user-vaccine'

import { useFetch } from '../../@shared/useFetch'

export const useFetchReadUserVaccine = (params: ReadUserVaccineParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => readUserVaccine(params),
    queryKey: [QueryKeyEnum.USER_VACCINE, params.userId, params.vaccineId],
  })

  return {
    ...response,
    vaccine: data,
  }
}

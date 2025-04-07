import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  readDiagnose,
  ReadDiagnoseParams,
} from '@/v3/infra/services/@v2/appointment/diagnose/read-diagnose'

import { useFetch } from '../../@shared/useFetch'

export const useFetchReadDiagnose = (params: ReadDiagnoseParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => readDiagnose(params),
    queryKey: [QueryKeyEnum.APPOINTMENT_DIAGNOSE, params.appointmentId, params.diagnoseId],
  })

  return {
    ...response,
    diagnose: data,
  }
}

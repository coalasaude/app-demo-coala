import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  readMedicineOptions,
  ReadMedicineOptionsParams,
} from '@/v3/infra/services/@v2/health-history/medicine/read-medicine-options'

import { useFetch } from '../../@shared/useFetch'

export const useFetchReadMedicineOptions = (params: ReadMedicineOptionsParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => readMedicineOptions(params),
    queryKey: [QueryKeyEnum.MEDICINE_OPTIONS, params.userId],
  })

  return {
    ...response,
    data,
  }
}

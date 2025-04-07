import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  readMedicine,
  ReadMedicineParams,
} from '@/v3/infra/services/@v2/health-history/medicine/read-medicine'

import { useFetch } from '../../@shared/useFetch'

export const useFetchReadMedicine = (params: ReadMedicineParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => readMedicine(params),
    queryKey: [QueryKeyEnum.MEDICINE, params.userId, params.medicineId],
  })

  return {
    ...response,
    medicine: data,
  }
}

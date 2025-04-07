import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  browseMedicine,
  BrowseMedicineParams,
} from '@/v3/infra/services/@v2/health-history/medicine/browse-medicine'

import { useFetch } from '../../@shared/useFetch'

export const useFetchBrowseMedicine = (params: BrowseMedicineParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => browseMedicine(params),
    queryKey: [QueryKeyEnum.MEDICINE, params.userId],
  })

  return {
    ...response,
    medicines: data,
  }
}

import { getDialogInfo } from '@/v3/infra/services/@v2/dashboard/get-dialog-info'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useFetch } from '../@shared/useFetch'

export type GetDialogInfoParams = {
  institutionId: number
}

export const useFetchGetDialogInfo = (params: GetDialogInfoParams) => {
  const { data, ...rest } = useFetch({
    queryFn: () => getDialogInfo(params),
    queryKey: [QueryKeyEnum.DASHBOARD_GET_DIALOG_INFO, params],
  })

  return {
    data,
    ...rest,
  }
}

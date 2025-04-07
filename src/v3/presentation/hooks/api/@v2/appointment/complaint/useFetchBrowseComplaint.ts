import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  browseComplaints,
  BrowseComplaintsParams,
} from '@/v3/infra/services/@v2/appointment/complaint/browse-complaints'

import { useFetch } from '../../@shared/useFetch'

export const useFetchBrowseComplaint = (params: BrowseComplaintsParams) => {
  const { data, ...response } = useFetch({
    queryFn: async () => {
      return browseComplaints(params)
    },
    queryKey: [QueryKeyEnum.APPOINTMENT_COMPLAINT, params],
  })

  return {
    ...response,
    complaints: data,
  }
}

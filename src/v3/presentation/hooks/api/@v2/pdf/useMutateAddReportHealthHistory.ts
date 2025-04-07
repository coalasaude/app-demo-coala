import {
  addReportHealthHistory,
  IAddReportHealthHistoryPayload,
} from '@/v3/infra/services/@v2/pdf/add-report-health-history'
import { ReportTypeEnum } from '@/v3/presentation/pages/organizations/pages/view/components/InstitutionTabPages/Reports/constants/report-type'

import { useApiResponseHandler } from '../../../useApiResponseHandler'
import { useMutate } from '../@shared/useMutate'

export type IAddReport = IAddReportHealthHistoryPayload
export type IReportAPIMap = Record<ReportTypeEnum, (data: any) => Promise<any>>

export const ReportAPIMap: IReportAPIMap = {
  [ReportTypeEnum.HEALTH_HISTORY]: addReportHealthHistory,
} as const

export const useMutateAddReport = () => {
  const { onErrorMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: async (data: IAddReport) => {
      return ReportAPIMap[data.reportType](data)
    },
    invalidateQueryKey: [],
    onError: onErrorMessage,
  })

  return mutate
}

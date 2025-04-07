import { ReportTypeEnum } from '@/v3/presentation/pages/organizations/pages/view/components/InstitutionTabPages/Reports/constants/report-type'

import apiRequest from '../../api'

export interface IAddReportHealthHistoryPayload {
  institutionsIds: number[]
  reportType: ReportTypeEnum.HEALTH_HISTORY
}

export const addReportHealthHistory = (body: IAddReportHealthHistoryPayload) =>
  apiRequest<void>({
    path: 'v2/pdfs/reports/health-history',
    throwError: true,
    method: 'POST',
    useApiFilters: false,
    body: body,
  })

import { ReportModel, ReportModelConstructor } from '@/v3/domain/@v2/appointment/report.model'

import apiRequest from '../../../api'

export type ReadReportResponse = ReportModelConstructor

export interface ReadReportParams {
  reportId: number
  appointmentId: number
}

export async function readReport({ appointmentId, reportId }: ReadReportParams) {
  const data = (await apiRequest<ReadReportResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/appointments/:appointmentId/reports/:reportId',
    pathParams: { appointmentId, reportId },
  })) as ReadReportResponse

  return new ReportModel(data)
}

import apiRequest from '../../../api'

export interface RegenerateUserReportParams {
  reportId: number
  appointmentId: number
}

export async function regenerateReport({ appointmentId, reportId }: RegenerateUserReportParams) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/appointments/:appointmentId/reports/:reportId/regenerate',
    pathParams: { appointmentId, reportId },
  })
}

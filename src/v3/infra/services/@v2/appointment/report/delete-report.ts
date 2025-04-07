import apiRequest from '../../../api'

export interface DeleteUserReportParams {
  reportId: number
  appointmentId: number
}

export async function deleteReport({ appointmentId, reportId }: DeleteUserReportParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/appointments/:appointmentId/reports/:reportId',
    pathParams: { appointmentId, reportId },
  })
}

import apiRequest from '../../../api'

export interface AddReportParams {
  appointmentId: number
  certificationPassword: string
  title: string
  body: string
}

export async function addReport({ appointmentId, ...params }: AddReportParams) {
  const report = (await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/appointments/:appointmentId/reports',
    body: params,
    pathParams: { appointmentId },
  })) as { id: number }

  return report
}

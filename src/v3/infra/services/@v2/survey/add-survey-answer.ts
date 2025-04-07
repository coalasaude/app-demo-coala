import apiRequest from '../../api'

export type EnableNotificationAppointmentResponse = boolean

export interface EnableNotificationAppointmentParams {
  answer: number
  comment?: string
  appointmentId?: number
  answerId?: number
  surveyId: number
}

export async function addSurveyAnswer({ surveyId, ...body }: EnableNotificationAppointmentParams) {
  return await apiRequest<boolean>({
    method: 'POST',
    throwError: true,
    path: 'v2/survey/:surveyId/answer',
    pathParams: { surveyId },
    body,
  })
}

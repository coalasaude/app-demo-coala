import { Dayjs } from 'dayjs'

import { appendFormData } from '@/v3/utils/append-form-data'

import apiRequest from '../../../api'

export interface AddRetroactiveAppointmentParams {
  file?: File | null
  patientId: number
  requesterId: number
  institutionId: number
  professionalId: number
  resume: string
  createdAtDate: Dayjs
  createdAtTime: Dayjs
  openedAtDate: Dayjs
  openedAtTime: Dayjs
  closedAtTime: Dayjs
  finishedReason: string
}

type AddAppointmentResponse = { id: number }

export async function addRetroactiveAppointment(params: AddRetroactiveAppointmentParams) {
  const formData = appendFormData(formatPayload(params))

  const appointment = (await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/institutions/:institutionId/appointments/retroactive',
    pathParams: { institutionId: params.institutionId },
    body: formData,
    cType: 'multipart/form-data',
  })) as AddAppointmentResponse

  return appointment
}

function formatPayload(params: AddRetroactiveAppointmentParams) {
  const createdAt = formatDateTime(params.createdAtDate, params.createdAtTime)
  const openedAt = formatDateTime(params.openedAtDate, params.openedAtTime)
  const closedAt = formatDateTime(params.openedAtDate, params.closedAtTime)

  return {
    patientId: params.patientId,
    requesterId: params.requesterId,
    resume: params.resume,
    createdAt: createdAt.toISOString(),
    openedAt: openedAt.toISOString(),
    closedAt: closedAt.toISOString(),
    professionalId: params.professionalId,
    finishedReason: params.finishedReason,
  }
}

function formatDateTime(date: Dayjs, time: Dayjs) {
  return date.hour(time.hour()).minute(time.minute()).second(time.second())
}

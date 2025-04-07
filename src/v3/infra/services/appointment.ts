import { TApiAppointmentResponse } from '@/v3/domain/api/ApiAppointmentResponse'
import { TApiFollowUpResponse } from '@/v3/domain/api/ApiFollowUpResponse'
import { AppointmentStatus } from '@/types/appointment'
import { AppointmentFinishedStatus } from '@/constants/appointment'
import { Complaint } from '@/types/complaint'
import { objectToFormData } from '@/utils/objectToFormData'
import { downloadByProxy } from '@/v3/utils/downloadByProxy'

import apiRequest, { apiInstance } from './api'
export interface AppointmentForm {
  complaint: string
  resume: string
  user_appointment?: string
  isInstitutional?: boolean
  isClinical?: boolean
  isRequestedUser?: boolean
  patient_id?: number | null
  has_no_patient?: boolean
  institution_id?: number | null
  requested_user_id?: number | null
  file?: FileList | null
}

export interface AppointmentApiFilter {
  user?: string
  search_date?: Date
  search_name?: string
  search_classification?: string[]
  institution_id?: number
  complaint?: Complaint
  status?: string[]
  offset?: number
  user_id?: number
}

export const createAppointment = ({
  data,
}: {
  data: AppointmentForm
}): Promise<TApiAppointmentResponse> => {
  const { file, ...dataForm } = data
  const formData = objectToFormData({
    ...dataForm,
    file,
    isClinical: !data.isClinical,
  })

  return apiRequest<TApiAppointmentResponse>({
    method: 'POST',
    path: 'appointments',
    body: formData,
    throwError: true,
    cType: 'multipart/form-data',
  }) as Promise<TApiAppointmentResponse>
}

export const updateAppointment = ({
  id,
  data,
}: {
  id: number
  data: AppointmentForm
}): Promise<TApiAppointmentResponse> => {
  return apiRequest<TApiAppointmentResponse>({
    method: 'PUT',
    path: `appointments/${id}`,
    body: data,
    throwError: true,
  }) as Promise<TApiAppointmentResponse>
}

export const getAppointment = (id: number) =>
  apiInstance.get<TApiAppointmentResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}appointments/${id}`,
  )

export const getAppointmentCount = (institutionId: number) =>
  apiInstance.get<number>(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}institution/${institutionId}/appointments`,
  )

export const listAppointment = ({
  orderByField,
  filters,
  limit,
  offset,
}: {
  orderByField?: string
  userId?: number
  limit?: number
  offset?: number
  filters?: Record<string, any>
}) => {
  return apiRequest<TApiAppointmentResponse>({
    path: `appointments`,
    method: 'GET',
    useApiFilters: true,

    queryParams: {
      ...filters,
      limit,
      offset,
      order_by: orderByField,
    },
  })
}

export const getFollowUp = (appointmentId: number, followUpId: number) =>
  apiInstance.get<TApiFollowUpResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}appointments/${appointmentId}/follow-up/${followUpId}`,
  )

export const listFollowUp = () =>
  apiInstance.get<TApiFollowUpResponse[]>(`${process.env.NEXT_PUBLIC_BASE_URL_API}follow-up`)

export const registerWebSocketLog = (sentAt: Date | null) => {
  return apiRequest<{
    id: number
    name: string
    data: any
    created_at: Date
  }>({
    path: `log/appointment/web-socket`,
    method: 'POST',
    body: {
      sentAt,
    },
  })
}

export const changeAppointmentStatus = ({
  appointmentId,
  status,
  finishedStatus,
}: {
  appointmentId: number
  status: AppointmentStatus
  finishedStatus?: AppointmentFinishedStatus | null
}) => {
  return apiRequest({
    path: `appointments/${appointmentId}/change-status`,
    method: 'POST',
    body: {
      status,
      finished_status: finishedStatus,
    },
  })
}

export async function downloadDocument(appointmentId?: number, documentId?: number) {
  if (!documentId || !appointmentId) {
    throw new Error('Não foi possível realizar o download do arquivo.')
  }

  const data = await apiRequest<any>({
    path: 'document',
    method: 'GET',
    throwError: true,
    queryParams: {
      document_id: documentId,
      appointment_id: appointmentId,
    },
  })

  if (data) downloadByProxy({ url: data.url })
}

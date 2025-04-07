import { AppointmentStatus } from '@/types/appointment'
import { MedicalRecordClassification } from '@/types/medicalRecord'
import {
  AppointmentBrowseModel,
  AppointmentBrowseModelConstructor,
} from '@/v3/domain/@v2/appointment/appointment-browse.model'
import { getOrderBy } from '@/v3/utils/get-order-by'

import apiRequest from '../../../api'

type BrowseAppointmentsResponse = AppointmentBrowseModelConstructor

export interface BrowseAppointmentsParams {
  offset?: number
  limit?: number
  searchName?: string
  searchDate?: Date
  classification?: MedicalRecordClassification[]
  status?: AppointmentStatus[]
  direction?: 'asc' | 'desc'
  orderBy?: 'name' | 'status'
  complaintId?: number
  institutionId?: number
  patientId?: number
}

export async function browseAppointments({
  orderBy,
  direction,
  ...params
}: BrowseAppointmentsParams) {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/appointments',
    queryParams: { ...params, orderBy: getOrderBy(orderBy, direction) },
  })) as BrowseAppointmentsResponse

  return new AppointmentBrowseModel({
    pagination: data.pagination,
    data: data.data,
  })
}

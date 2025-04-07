import { AppointmentBrowseDataModel } from '@/v3/domain/@v2/appointment/appointment-browse-data.model'
import { BrowseAppointmentsParams } from '@/v3/infra/services/@v2/appointment/appointment/browse-appointments'

import { ParticipantsMapType } from '../../hooks/useAppointmentEmergency'

export interface IAppointmentListTable {
  appointments?: AppointmentBrowseDataModel[]
  count?: number
  limit?: number
  isLoading?: boolean
  canManageAppointment?: boolean
  onClickRow?: (appointmentId: number) => void
  setFilters: (filter: IAppointmentFilterFields) => void
  onChangePage?: (page: number, offset: number) => void
  offset?: number
  orderBy?: BrowseAppointmentsParams['orderBy']
  direction?: BrowseAppointmentsParams['direction']
  participantsMap?: ParticipantsMapType
}

export type IAppointmentFilterFields = BrowseAppointmentsParams

export interface IDrawerFilterAppointmentListTable {
  open: boolean
  onClose: () => Promise<void> | void
  setFilters: (filter: IAppointmentFilterFields) => void
  filters: IAppointmentFilterFields
}

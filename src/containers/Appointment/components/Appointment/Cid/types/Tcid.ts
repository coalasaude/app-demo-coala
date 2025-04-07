import { Dispatch, SetStateAction } from 'react'

import { CidAppointment } from '@/types/cid'

export interface TCidAppointment {
  appointmentId?: number
  hasPatient?: boolean
}

export type TCidAppointmentProps = TCidAppointment & {
  data: CidAppointment[]
  handleClose: () => void
  handleClick: any
  open: boolean
  canManageAppointment: boolean
  appointmentId?: number
  setShowRemoveModal: Dispatch<SetStateAction<boolean>>
  showRemoveModal: boolean
  hasPatient?: boolean
  getCids: () => Promise<null | undefined>
  anchorEl: {
    recordId: number | null
    element: null | HTMLElement
  }
}

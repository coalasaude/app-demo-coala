import { Records, RecordsReqData } from '@/types/records'
import { DefaultStatus } from '@/types/status'
import { ProfessionalModel } from '@/v3/domain/@v2/appointment/professional.model'

export interface RecordProps {
  id: number
  status: DefaultStatus
  professional: ProfessionalModel
  document?: {
    id: number
    url: string
  }
}

export interface RecordContentProps {
  recordId: number
  appointmentId: number
  canManage: boolean
  viewOverlay: boolean
  onDeselect: () => void
}

export interface TRecords {
  getDocumentUrl: (documentId: number) => void
  showInvalidate: (id: number) => void
  appointmentId?: number
}

export interface RecordsWithDocuments extends RecordsReqData {
  results: (Records & {
    documentUrl: string
  })[]
}

export type TRecordsProps = TRecords & {
  data?: RecordsReqData
  handleClose: () => void
  onSubmit: (values: any) => Promise<void>
  handleClick: any
  open: boolean
  canManageAppointment: boolean
  typeInvalidate?: string
  getDocumentUrl: (documentId: number) => void
  setTypeInvalidate: any
  appointmentId?: number
  hasPatient?: boolean
  anchorEl: {
    documentId: number | null
    recordId: number | null
    element: null | HTMLElement
    documentUrl: string
  }
}

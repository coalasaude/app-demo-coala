import { UseFormHandleSubmit, UseFormWatch } from 'react-hook-form'

export type AddMedicalRecordProps = {
  isAppointmentResume?: boolean
  hasScheduledAppointmentId: boolean
  hasFinishedMedicalRecord?: boolean
  isMedical?: boolean
  handleShowModal: (value: boolean) => void
  showModal: boolean
  onFinish: () => Promise<boolean | void>
  handleSubmit: UseFormHandleSubmit<any, any>
  onCancel: () => void
  watch: UseFormWatch<any>
  error?: string
}

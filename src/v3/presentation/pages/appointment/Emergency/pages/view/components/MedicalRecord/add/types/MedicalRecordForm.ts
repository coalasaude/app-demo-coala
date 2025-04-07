export type MedicalRecordFormProps = {
  error?: string | null
  onSubmit: () => void
  isScheduled: boolean
  isAppointmentResume?: boolean
  isMedical?: boolean
  handleSubmitError: () => void
  isSmallDevice: boolean
  withDivider?: boolean
  diagnoseExternal?: boolean
  onCancel: () => void
}

import { MedicalRecordClassification } from '@/types/medicalRecord'

export const getPillColor = (medicalRecordStatus?: string) => {
  if (medicalRecordStatus === MedicalRecordClassification.EMERGENCY) {
    return '--mui-palette-error-main'
  }
  if (medicalRecordStatus === MedicalRecordClassification.URGENT) {
    return '--mui-palette-warning-main'
  }
  if (medicalRecordStatus === MedicalRecordClassification.VERY_URGENT) {
    return '--mui-palette-emergency-main'
  }
  if (medicalRecordStatus === MedicalRecordClassification.LOW_URGENT) {
    return '--mui-palette-success-main'
  }
  if (medicalRecordStatus === MedicalRecordClassification.NOT_URGENT) {
    return '--mui-palette-info-main'
  }
  return '--mui-palette-grey-700'
}

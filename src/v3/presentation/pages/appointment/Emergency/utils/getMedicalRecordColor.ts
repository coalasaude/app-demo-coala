import { MedicalRecordClassification } from '@/types/medicalRecord'

export const getMedicalRecordColor = (medicalRecordStatus?: string) => {
  if (!medicalRecordStatus) return '--mui-palette-grey-300'

  const classificationColorMap = {
    [MedicalRecordClassification.EMERGENCY]: '--mui-palette-error-light',
    [MedicalRecordClassification.URGENT]: '--mui-palette-warning-light',
    [MedicalRecordClassification.VERY_URGENT]: '--mui-palette-emergency-light',
    [MedicalRecordClassification.LOW_URGENT]: '--mui-palette-success-light',
    [MedicalRecordClassification.NOT_URGENT]: '--mui-palette-info-light',
    [MedicalRecordClassification.NO_CLASSIFICATION]: '--mui-palette-grey-300',
  }

  return classificationColorMap[medicalRecordStatus as MedicalRecordClassification]
}

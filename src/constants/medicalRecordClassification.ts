import { MedicalRecordClassification } from '@/types/medicalRecord'

export const MEDICAL_RECORD_CLASSIFICATION_DESCRIPTION: Record<string, string> = {
  [MedicalRecordClassification.EMERGENCY]: 'Emergência',
  [MedicalRecordClassification.LOW_URGENT]: 'Pouco urgente',
  [MedicalRecordClassification.NOT_URGENT]: 'Não urgente',
  [MedicalRecordClassification.VERY_URGENT]: 'Muito urgente',
  [MedicalRecordClassification.URGENT]: 'Urgente',
  [MedicalRecordClassification.NO_CLASSIFICATION]: 'Sem classificação',
}

export const MedicalRecordClassificationOptions = [
  {
    label: 'Sem classificação',
    value: MedicalRecordClassification.NO_CLASSIFICATION,
  },
  {
    label: MEDICAL_RECORD_CLASSIFICATION_DESCRIPTION[MedicalRecordClassification.EMERGENCY],
    value: MedicalRecordClassification.EMERGENCY,
  },
  {
    label: MEDICAL_RECORD_CLASSIFICATION_DESCRIPTION[MedicalRecordClassification.LOW_URGENT],
    value: MedicalRecordClassification.LOW_URGENT,
  },
  {
    label: MEDICAL_RECORD_CLASSIFICATION_DESCRIPTION[MedicalRecordClassification.NOT_URGENT],
    value: MedicalRecordClassification.NOT_URGENT,
  },
  {
    label: MEDICAL_RECORD_CLASSIFICATION_DESCRIPTION[MedicalRecordClassification.VERY_URGENT],
    value: MedicalRecordClassification.VERY_URGENT,
  },
  {
    label: MEDICAL_RECORD_CLASSIFICATION_DESCRIPTION[MedicalRecordClassification.URGENT],
    value: MedicalRecordClassification.URGENT,
  },
]

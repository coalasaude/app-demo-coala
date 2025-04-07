import * as yup from 'yup'

import { MedicalRecordClassification } from '@/v3/domain/medical-record'

export const schema = yup.object({
  classification: yup
    .string()
    .oneOf(
      [
        MedicalRecordClassification.EMERGENCY,
        MedicalRecordClassification.LOW_URGENT,
        MedicalRecordClassification.NOT_URGENT,
        MedicalRecordClassification.URGENT,
        MedicalRecordClassification.VERY_URGENT,
      ],
      'Este campo é obrigatório.',
    )
    .required(),
  systolic: yup.string().max(300).nullable(),
  diastolic: yup.string().max(300).nullable(),
  heart_rate: yup.string().max(300).nullable(),
  respiratory_frequency: yup.string().max(80).nullable(),
  body_temperature: yup.string().nullable(),
  oxygen_saturation: yup.string().max(100).nullable().notRequired(),
  history: yup.string().required(),
  exam: yup.string().required(),
  impression: yup.string().required(),
  conduct: yup.string().required(),
}) as any

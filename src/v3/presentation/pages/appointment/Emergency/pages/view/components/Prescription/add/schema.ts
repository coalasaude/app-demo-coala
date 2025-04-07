import * as yup from 'yup'

import { PrescriptionType } from '@/types/records'

import { IMedicineFormFields, schemaMedicine } from './components/Medicines/schema'

export const schema = yup.object({
  valid_until: yup.number().max(90).required(),
  type_prescription: yup
    .string()
    .oneOf([PrescriptionType.SIMPLE, PrescriptionType.ESPECIAL])
    .required(),
  medicine: yup.array().of(schemaMedicine),
}) as any

export const initialValues = {
  valid_until: '',
  certificatePass: '',
  type_prescription: PrescriptionType.SIMPLE,
  medicine: [] as IMedicineFormFields[],
}

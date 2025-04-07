import * as yup from 'yup'

import { FileAsync } from '@/types/FileAsync'

import { IMedicineFormFields, schemaMedicine } from '../FormMedicine/schema'

export const schemaPrescription = yup.object({
  prescriptionFile: yup.mixed().required(),
  emissionDate: yup.date().required(),
  medicines: yup.array().min(1).of(schemaMedicine),
}) as any

export interface IPrescriptionMedicineFormFields {
  prescriptionFile: FileAsync
  emissionDate: Date
  medicines: IMedicineFormFields[]
}

export const initialPrescriptionMedicineValues = {
  medicines: [{ startHour: null, startDate: null }],
} as unknown as IPrescriptionMedicineFormFields

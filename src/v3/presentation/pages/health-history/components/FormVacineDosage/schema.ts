import * as yup from 'yup'

import { FileAsync } from '@/types/FileAsync'

const schema = yup.object({
  dosages: yup.number().optional(),
  reinforcements: yup.number().optional(),
  vacineId: yup.number().required(),
  dosageDates: yup.array().of(yup.date().required()),
  reinforcementDates: yup.array().of(yup.date().required()),
})

export const schemaVaccineDosage = yup.object({
  document: yup.mixed<FileAsync>().required(),
  vaccines: yup.array().min(1).of(schema).required(),
})

export type IVaccineFormField = yup.InferType<typeof schema>
export type IVaccineDosageFormFields = yup.InferType<typeof schemaVaccineDosage>

export const initialVaccineDosageValues: IVaccineDosageFormFields = {
  document: null,
  vaccines: [],
} as unknown as IVaccineDosageFormFields

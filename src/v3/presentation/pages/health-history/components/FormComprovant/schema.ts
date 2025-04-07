import * as yup from 'yup'

export const schemaComprovant = yup.object({
  vaccines: yup.array().of(yup.number()).required(),
  document: yup.mixed<File>().required(),
}) as any

export interface IVaccineComprovantFormFields {
  vaccines: number[]
  document: File | null
}

export const initialComprovantValues = {
  vaccines: [] as number[],
  document: null,
} as unknown as IVaccineComprovantFormFields

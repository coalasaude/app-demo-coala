import * as yup from 'yup'

export const schemaMedicine = yup.object().shape({
  name: yup.string().required(),
  concentration: yup.string().required(),
  medicine_concentration_unit_id: yup.string().required(),
  dosage: yup.string().required(),
  medicine_dosage_unit_id: yup.string().required(),
  observation: yup.string(),
  scheduled_medicine_id: yup.string().required(),
  valid_until: yup.string().when('continuous_usage', {
    is: (value: string) => value === 'false',
    then: (schema) => schema.required(),
  }),
  recommendation: yup.string().when('use_if_necessary', {
    is: (value: string) => value === 'true',
    then: (schema) => schema.required(),
  }),
}) as any

export interface IMedicineFormFields {
  name: string
  concentration: string
  medicine_concentration_unit_id: string
  dosage: string
  medicine_dosage_unit_id: string
  observation: string
  scheduled_medicine_id: string
  valid_until: string
  recommendation: string
}

import * as yup from 'yup'

import { MAX_ACCEPTED_DATE, UNTIL_TODAY } from '@/v3/utils/accept-date'

export interface IHealthInsuranceFormFields {
  document: File
  insuranceCompany: string
  code: string
  validUntil: Date
  plan: string
}

export const schemaHealthInsurance = yup.object({
  insuranceCompany: yup.string().required(),
  code: yup.string().required(),
  plan: yup.string().required(),
  validUntil: yup.date().required().min(UNTIL_TODAY).max(MAX_ACCEPTED_DATE),
  document: yup.mixed().required(),
})

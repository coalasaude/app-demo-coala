import * as yup from 'yup'

import {
  IHealthInsuranceFormFields,
  schemaHealthInsurance,
} from '@/v3/presentation/pages/users/components/FormHealthInsurance/schema'

export interface IHealthInsurancesFormFields {
  healthInsurance: IHealthInsuranceFormFields[]
}

export const schemaHealthInsurances = yup.object({
  healthInsurance: yup.array().min(1).of(schemaHealthInsurance),
}) as any

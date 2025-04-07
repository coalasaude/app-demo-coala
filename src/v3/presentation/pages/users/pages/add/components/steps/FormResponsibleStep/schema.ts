import * as yup from 'yup'

import {
  IFormResponsibleDataFields,
  schemaFormResponsibleDataFields,
} from '@/v3/presentation/pages/users/components/FormResponsible/schema'

export interface IFormResponsibleFields {
  responsible: IFormResponsibleDataFields[]
}

export const schemaManyResponsible = yup.object({
  responsible: yup.array().min(1).of(schemaFormResponsibleDataFields),
})

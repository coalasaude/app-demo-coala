import { User } from '@/v3/domain/User'

import { schemaUser } from '../../pages/add/components/steps/FormUserStep/schema'

export interface IFormResponsibleDataFields {
  name: string
  lastname: string
  phone: string
  email: string
  responsible?: User
}

export const schemaFormResponsibleDataFields = schemaUser

import { DefaultStatus } from '@/types/status'

import { HealthUnitType } from '../../../api/ApiHealthUnitResponse'

import { CompanyModel, CompanyModelConstructor } from './company.model'
import { ContactModel, ContactModelConstructor } from './contact.model'

export type SummaryHealthUnitModelConstructor = {
  id: number
  status: DefaultStatus
  type: HealthUnitType
  name: string
  contact: ContactModelConstructor
  company: CompanyModelConstructor
}

export class SummarySummaryHealthUnitModel {
  id: number
  status: DefaultStatus
  name: string
  type: HealthUnitType
  contact: ContactModel
  company: CompanyModel

  constructor(params: SummaryHealthUnitModelConstructor) {
    this.id = params.id
    this.status = params.status
    this.type = params.type
    this.name = params.name
    this.contact = new ContactModel(params.contact)
    this.company = new CompanyModel(params.company)
  }

  toJSON() {
    return {
      id: this.id,
      status: this.status,
      type: this.type,
      name: this.name,
      contact: this.contact.toJSON(),
      company: this.company.toJSON(),
    }
  }
}

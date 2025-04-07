import { DefaultStatus } from '@/types/status'

import { AppointmentModel, AppointmentModelConstructor } from './appointment.model'
import { CompanyModel, CompanyModelConstructor } from './company.model'
import { ContactModel, ContactModelConstructor } from './contact.model'
import { FinancialModel, FinancialModelConstructor } from './financial.model'
import { InfrastructureModel, InfrastructureModelConstructor } from './infrastructure.model'
import { AddressModel, AddressModelConstructor } from './address.model'

export type HealthUnitModelConstructor = {
  id: number
  status: DefaultStatus
  type: string
  address: AddressModelConstructor
  contact: ContactModelConstructor
  company: CompanyModelConstructor
  appointment: AppointmentModelConstructor
  financial: FinancialModelConstructor
  infrastructure: InfrastructureModelConstructor
}

export class HealthUnitModel {
  id: number
  status: DefaultStatus
  type: string
  address: AddressModel
  contact: ContactModel
  company: CompanyModel
  appointment: AppointmentModel
  financial: FinancialModel
  infrastructure: InfrastructureModel

  constructor(params: HealthUnitModelConstructor) {
    this.id = params.id
    this.status = params.status
    this.type = params.type
    this.address = new AddressModel(params.address)
    this.contact = new ContactModel(params.contact)
    this.company = new CompanyModel(params.company)
    this.appointment = new AppointmentModel(params.appointment)
    this.financial = new FinancialModel(params.financial)
    this.infrastructure = new InfrastructureModel(params.infrastructure)
  }

  toJSON() {
    return {
      id: this.id,
      status: this.status,
      type: this.type,
      address: this.address.toJSON(),
      contact: this.contact.toJSON(),
      company: this.company.toJSON(),
      appointment: this.appointment.toJSON(),
      financial: this.financial.toJSON(),
      infrastructure: this.infrastructure.toJSON(),
    }
  }
}

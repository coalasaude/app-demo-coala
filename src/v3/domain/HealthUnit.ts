import { Institution } from '@/types/institution'
import { DefaultStatus } from '@/types/status'

import { Appointment, Company, Financial, Infrasctructure } from './api/ApiHealthUnitResponse'

export class HealthUnit {
  id?: number
  status?: DefaultStatus
  company: Company
  infrastructure: Infrasctructure
  financial: Financial
  appointment: Appointment
  institutions?: Institution[]

  constructor(props: HealthUnit) {
    this.id = props.id
    this.status = props.status
    this.company = props.company
    this.infrastructure = props.infrastructure
    this.financial = props.financial
    this.appointment = props.appointment
    this.institutions = props.institutions
  }
}

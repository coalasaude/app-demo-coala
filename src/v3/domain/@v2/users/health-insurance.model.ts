import { formatDate } from '@/utils/formatDate'

import { AppFileModel } from '../@shared/app-file.model'

export interface HealthInsuranceModelConstructor {
  id: number
  insuranceCompany: string
  code: string
  plan: string
  validUntil: Date
  document: AppFileModel
}

export class HealthInsuranceModel {
  public readonly id: number
  public readonly insuranceCompany: string
  public readonly code: string
  public readonly plan: string
  public readonly validUntil: Date
  public readonly document: AppFileModel

  constructor(data: HealthInsuranceModelConstructor) {
    this.id = data.id
    this.insuranceCompany = data.insuranceCompany
    this.code = data.code
    this.plan = data.plan
    this.validUntil = data.validUntil
    this.document = new AppFileModel(data.document)
  }

  getFormattedValidUntil() {
    if (!this.validUntil) return ''
    return formatDate(this.validUntil)
  }

  getFileName() {
    return this.document.fileName?.split('/')?.at(-1)
  }
}

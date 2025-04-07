import { priceNormalizer } from '@/components/Forms/normalizers/priceNormalizer'
import { pixNormalizer } from '@/components/Forms/normalizers/pixNormalizer'
import { HEALTH_UNIT_PAYMENT_METHOD_DESCRIPTIONS } from '@/v3/presentation/pages/health-unit/constants/paymentMethods'

import { HealthUnitPaymentMethods } from '../../../api/ApiHealthUnitResponse'

import { BankModel, BankModelConstructor } from './bank.model'

export type FinancialModelConstructor = {
  appointmentAveragePrice?: string
  responsibleFinance?: string
  paymentMethods?: HealthUnitPaymentMethods[]
  bank?: BankModelConstructor
  pixKey?: string
}

export class FinancialModel {
  private _appointmentAveragePrice?: string
  public readonly responsibleFinance?: string
  public readonly paymentMethods?: HealthUnitPaymentMethods[]
  public readonly bank?: BankModel
  private _pixKey?: string

  constructor(props: FinancialModelConstructor) {
    this._appointmentAveragePrice = props.appointmentAveragePrice
    this.responsibleFinance = props.responsibleFinance
    this.paymentMethods = props.paymentMethods
    this.bank = new BankModel(props.bank)
    this._pixKey = props.pixKey
  }

  get appointmentAveragePrice() {
    return priceNormalizer(this._appointmentAveragePrice)
  }

  get pixKey() {
    return pixNormalizer(this._pixKey)
  }

  get formattedPaymentMethod() {
    return this.paymentMethods
      ?.map((method) => HEALTH_UNIT_PAYMENT_METHOD_DESCRIPTIONS[method])
      .join(', ')
  }

  toJSON() {
    return {
      appointmentAveragePrice: this._appointmentAveragePrice,
      responsibleFinance: this.responsibleFinance,
      paymentMethods: this.paymentMethods,
      bank: this.bank?.toJSON(),
      pixKey: this._pixKey,
    }
  }
}

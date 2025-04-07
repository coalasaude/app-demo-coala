import { Interval, PlanPermission } from '@/types/plan'
import { DefaultStatus } from '@/types/status'

export enum PlanType {
  B2C = 'B2C',
  UPGRADE = 'UPGRADE',
  INSTITUTION = 'INSTITUTION',
}

export type TPlan = Partial<{
  id: number
  productName: string
  amount: number
  originalAmount: number
  interval: Interval
  striplePlanId: string
  extraInfo: string
  isUpgrade: boolean
  intervalCount: number
  status: DefaultStatus
  PlanPermission: PlanPermission[]
  type: PlanType
}>

export class Plan {
  data: TPlan
  interval: any
  constructor(params: TPlan) {
    this.data = params
  }

  getFormattedAmount() {
    const price = this.data.amount ? this.data.amount / 100 : 0
    if (this.data.intervalCount) {
      const value = price / this.data.intervalCount
      return `R$ ${value % 1 !== 0 ? value.toFixed(2)?.replace('.', ',') : value}`
    }
    return `R$ ${price.toFixed(2)?.replace('.', ',')}`
  }

  static getFormattedAmount(amount: number) {
    if (!amount) return 0
    const price = amount ? amount / 100 : 0
    return `R$ ${price.toFixed(2)?.replace('.', ',')}`
  }

  getFormattedOriginalAmount() {
    const price = this.data.originalAmount ? this.data.originalAmount / 100 : 0

    if (this.data.intervalCount) {
      const value = price / this.data.intervalCount
      return `R$ ${value % 1 !== 0 ? value.toFixed(2)?.replace('.', ',') : Math.trunc(value)}`
    }
    return `R$ ${price % 1 !== 0 ? price.toFixed(2)?.replace('.', ',') : Math.trunc(price)}`
  }

  getAmount() {
    const price = this.data.amount ? this.data.amount / 100 : 0
    return `R$ ${price % 1 !== 0 ? price.toFixed(2)?.replace('.', ',') : Math.trunc(price)}`
  }

  getRawAmount() {
    return this.data.amount ? this.data.amount / 100 : 0
  }
}

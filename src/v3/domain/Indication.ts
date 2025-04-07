import { User } from './User'
import { TApiIndicationRequest } from './api/ApiIndicatioRequest'

export enum IndicationStatus {
  PENDING = 'PENDING',
  VALID = 'VALID',
  INVALID = 'INVALID',
}

export enum RedeemStatus {
  AVAILABLE = 'AVAILABLE',
  REQUESTED = 'REQUESTED',
  RECEIVED = 'RECEIVED',
}

export class Indication {
  id: number
  userId: number
  user?: User
  fantasyName: string
  managerName: string
  managerEmail: string
  managerPhone: string
  state: string
  city: string
  monthlyPayment: number
  numberStudents: number
  status: IndicationStatus
  redeemStatus?: RedeemStatus
  requestAt?: Date | null
  createdAt: Date
  updatedAt?: Date | null

  constructor(indication: TApiIndicationRequest) {
    this.id = indication.id
    this.userId = indication.user_id
    this.user = indication.user ? new User(indication.user) : undefined
    this.fantasyName = indication.fantasy_name
    this.managerName = indication.manager_name
    this.managerEmail = indication.manager_email
    this.managerPhone = indication.manager_phone
    this.state = indication.state
    this.city = indication.city
    this.monthlyPayment = indication.monthly_payment
    this.numberStudents = indication.number_students
    this.status = indication.status
    this.redeemStatus = indication.redeem_status
    this.requestAt = indication.request_at
    this.createdAt = indication.created_at
    this.updatedAt = indication.updated_at
  }
}

import { Institution } from './institution'
import { User } from './user'
import { UserProfile } from './userProfile'

export interface Refund {
  id: number
  created_at: Date
  requested_user_id: number
  patient_id: number
  institution_id: number
  requestedUser: User
  patient: User
  financial_officer: boolean
  institution: Institution
  hospital_name: string
  hospital_address: string
  bank_account: string
  bank_branch: string
  status: RefundStatus
  type: RefundType
  reason_rejected: RejectedRefundStatus | null
  bank: string
  expenses: Expense[]
  requestedUserRole: UserProfile
  patientUserRole: UserProfile
}

export enum RefundStatus {
  DEFERRED = 'DEFERRED',
  PARTIALLY_DEFERRED = 'PARTIALLY_DEFERRED',
  REJECTED = 'REJECTED',
  IN_ANALYSIS = 'IN_ANALYSIS',
  AWAITING_REVIEW = 'AWAITING_REVIEW',
  CANCELED = 'CANCELED',
}

export enum RejectedRefundStatus {
  INVALID_PROOF = 'INVALID_PROOF',
  MISSING_PROOF = 'MISSING_PROOF',
  INSUFFICIENT_COVERAGE = 'INSUFFICIENT_COVERAGE',
  OTHERS = 'OTHERS',
}

export interface Expense {
  id: number
  type: ExpenseType
  description: string | null
  document_id: number
}

export enum RefundType {
  TED = 'TED',
  PIX = 'PIX',
  BOLETO = 'BOLETO',
}

export enum ExpenseType {
  HOSPITAL = 'HOSPITAL',
  TRANSPORT = 'TRANSPORT',
  OTHERS = 'OTHERS',
}

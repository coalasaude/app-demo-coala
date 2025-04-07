import { SubscriptionStatus } from '@/types/subscription'
import { CancelSubscription } from '@/v2/data/subscription/cancel-subscription'

import { TPlan } from '../Plan'

import { TApiInstitutionResponse } from './ApiInstitutionResponse'

export interface TApiSubscriptionResponse {
  id: number
  plan_id: number
  plan: TPlan
  user_id: number
  payment_link: string
  current_period_end: string
  cancel_at: string
  clientSecret: string
  stripe_subscription_id: string
  status: SubscriptionStatus
  cancel_at_period_end: boolean
  institution_id: number
  institution: TApiInstitutionResponse
  created_at: string
  cancel_subscription: CancelSubscription[]
  isTrial?: boolean
  amount?: number
}

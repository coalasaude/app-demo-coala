import { CancelSubscription } from '@/v2/data/subscription/cancel-subscription'

import { Plan } from './plan'
import { User } from './user'
import { Institution } from './institution'

export interface Subscription {
  id: number
  plan_id: number
  plan: Plan
  user_id: number
  user: User
  payment_link: string
  current_period_end: string
  cancel_at: string
  clientSecret: string
  stripe_subscription_id: string
  status: SubscriptionStatus
  cancel_at_period_end: boolean
  institution_id: number
  institution: Institution
  created_at: string
  cancel_subscription: CancelSubscription[]
  isTrial?: boolean
  amount?: number
}

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  INCOMPLETE = 'INCOMPLETE',
  INCOMPLETE_EXPIRED = 'INCOMPLETE_EXPIRED',
  PAST_DUE = 'PAST_DUE',
  CANCELED = 'CANCELED',
  UNPAID = 'UNPAID',
  TRIALING = 'TRIALING',
}

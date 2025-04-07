import { SubscriptionStatus } from '@/types/subscription'

import { TApiSubscriptionResponse } from './api/ApiSubscriptionResponse'
import { Plan } from './Plan'
import { Institution } from './Institution'

export class Subscription {
  id: number
  planId: number
  plan: Plan
  userId: number
  paymentLink: string
  currentPeriodEnd: string
  cancelAt: string
  clientSecret: string
  stripeSubscriptionId: string
  status: SubscriptionStatus
  cancelAtPeriodEnd: boolean
  institutionId: number
  institution: Institution
  created_at: string
  // cancelSubscription: CancelSubscription[]
  isTrial?: boolean
  amount?: number

  constructor(params: TApiSubscriptionResponse) {
    this.id = params.id
    this.planId = params.plan_id
    this.plan = new Plan(params.plan)
    this.userId = params.user_id
    this.paymentLink = params.payment_link
    this.currentPeriodEnd = params.current_period_end
    this.cancelAt = params.cancel_at
    this.clientSecret = params.clientSecret
    this.stripeSubscriptionId = params.stripe_subscription_id
    this.status = params.status
    this.cancelAtPeriodEnd = params.cancel_at_period_end
    this.institutionId = params.institution_id
    this.institution = new Institution(params.institution)
    this.created_at = params.created_at
    // this.cancelSubscription = params.cancel_subscription
    this.isTrial = params.isTrial
    this.amount = params.amount
  }
}

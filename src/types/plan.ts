import { DefaultStatus } from './status'
import { Permissions } from './permissions'

export interface Plan {
  id: number
  product_name: string
  amount: number
  interval: Interval
  stripe_plan_id: string
  status: DefaultStatus
  PlanPermission: PlanPermission[]
}

export interface PlanPermission {
  id: number
  plan: Plan
  plan_id: number
  permission: Permissions
  permission_id: number
}

export enum Interval {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}

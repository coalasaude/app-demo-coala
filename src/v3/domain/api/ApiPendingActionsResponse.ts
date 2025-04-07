import { PENDING_ACTIONS_SUB_TYPES, PENDING_ACTIONS_TYPES } from '@/types/pendingActionsTypes'

export type ApiPendingActionsResponse = {
  userName: string
  userId: number
  type: keyof typeof PENDING_ACTIONS_TYPES
  subType: keyof typeof PENDING_ACTIONS_SUB_TYPES
}[]

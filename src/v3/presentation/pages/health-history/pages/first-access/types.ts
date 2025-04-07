import { UserModel } from '@/v3/domain/@v2/users/users.model'

export interface BaseStepProps {
  onStart: () => Promise<void>
  onConfirm: () => Promise<void>
  onSkip: () => Promise<void>
  user: UserModel
}

export interface BaseFormStepProps {
  onConfirm: () => Promise<void>
  onSkip: () => Promise<void>
  user: UserModel
}

export interface BaseDecisionStepProps {
  onStart: () => Promise<void>
  onSkip: () => Promise<void>
  user: UserModel
}

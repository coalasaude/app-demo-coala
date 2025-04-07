import { UserModel } from '@/v3/domain/@v2/users/users.model'

import { IActivationState } from './hooks/useActivation'

export interface IStepActivationProps {
  setActivation: (authData: IActivationState) => void
  resetActivation: (data?: IActivationState) => void
  activation: IActivationState
  user: UserModel
  accessType: 'email' | 'phone'
}

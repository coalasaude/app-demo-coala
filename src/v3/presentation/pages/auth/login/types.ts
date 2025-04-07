import { IAuthLoginState } from './hooks/useLoginUser'

export interface IStepLoginProps {
  setAuthentication: (authData: IAuthLoginState) => void
  resetAuthentication: (data?: IAuthLoginState) => void
  authentication: IAuthLoginState
}

import { CWizard } from '../../../components/CWizard'
import AuthenticationContainer from '../components/AuthenticationContainer'

import { ChangePasswordStep } from './components/steps/ChangePasswordStep'
import { InitLoginStep } from './components/steps/InitLoginStep'
import { PasswordLoginStep } from './components/steps/PasswordLoginStep'
import { TokenLoginStep } from './components/steps/TokenLoginStep'
import { useLoginUser } from './hooks/useLoginUser'

export const LoginPage = () => {
  const { isPasswordLogin, accessType, isChangePassword, ...props } = useLoginUser()

  return (
    <AuthenticationContainer>
      <CWizard urlControl resetOnMount>
        <InitLoginStep {...props} />
        {isPasswordLogin ? (
          <PasswordLoginStep {...props} />
        ) : (
          <TokenLoginStep accessType={accessType} {...props} />
        )}
        {isChangePassword && <TokenLoginStep accessType={accessType} isChangePassword {...props} />}
        {isChangePassword && <ChangePasswordStep />}
      </CWizard>
    </AuthenticationContainer>
  )
}

export default LoginPage

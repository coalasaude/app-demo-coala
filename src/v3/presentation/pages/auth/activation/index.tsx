import { useEffect } from 'react'
import { usePostHog } from 'posthog-js/react'

import { ActivationStatusEnum } from '@/v3/infra/services/login/login'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'

import { CWizard } from '../../../components/CWizard'
import AuthenticationContainer from '../components/AuthenticationContainer'

import { CreatePasswordStep } from './components/steps/CreatePasswordStep'
import { InsertAccessStep } from './components/steps/InsertAccessStep'
import { InsertCertificationStep } from './components/steps/InsertCertificationStep'
import { TokenValidateStep } from './components/steps/TokenValidateStep'
import { UserDataStep } from './components/steps/UserDataStep'
import { useActivation } from './hooks/useActivation'

export const ActivationPage = () => {
  const { config, isLoading, user, ...props } = useActivation()
  const posthog = usePostHog()
  const { getCount } = usePageTimeCounter()

  useEffect(() => {
    if (props.activation.activationStatus === ActivationStatusEnum.ACTIVE) {
      posthog.capture('activation_completed', { time_spent: getCount() })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.activation])

  if (!user) return null

  return (
    <AuthenticationContainer isLoading={isLoading}>
      <CWizard urlControl resetOnMount>
        {config.showInsertStep && <InsertAccessStep user={user} {...props} />}
        {config.showValidationStep && (
          <TokenValidateStep user={user} disabledEdit={!config.showInsertStep} {...props} />
        )}
        {config.showUserDataStep && <UserDataStep user={user} {...props} />}
        {config.isMissingPassword && <CreatePasswordStep />}
        {config.showCertificationStep && <InsertCertificationStep />}
      </CWizard>
    </AuthenticationContainer>
  )
}

export default ActivationPage

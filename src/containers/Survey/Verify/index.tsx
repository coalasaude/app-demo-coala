import useMediaQuery from '@/hooks/useMediaQuery'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

import SurveyVerifyDesktop from './index.desktop'
import SurveyVerifyMobile from './index.mobile'

export const SurveyVerify = () => {
  const isSmallDevice = useMediaQuery('sm')

  const { auth } = useAuth()
  const isActivateUser = !auth.token?.surveyOnly

  if (isSmallDevice) {
    return <SurveyVerifyMobile isActivateUser={isActivateUser} />
  }

  return <SurveyVerifyDesktop isActivateUser={isActivateUser} />
}

export default SurveyVerify

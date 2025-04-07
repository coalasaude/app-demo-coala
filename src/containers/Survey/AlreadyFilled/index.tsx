import useMediaQuery from '@/hooks/useMediaQuery'

import SurveyAlreadyFilledMobile from './index.mobile'
import SurveyAlreadyFilledDesktop from './index.desktop'

export const SurveyAlreadyFilled = () => {
  const isSmallDevice = useMediaQuery('sm')

  if (isSmallDevice) {
    return <SurveyAlreadyFilledMobile />
  }

  return <SurveyAlreadyFilledDesktop />
}

export default SurveyAlreadyFilled

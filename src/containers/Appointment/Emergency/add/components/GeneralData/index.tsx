import { useFormContext } from 'react-hook-form'

import useMediaQuery from '@/hooks/useMediaQuery'

import GeneralDataMobile from './index.mobile'
import GeneralDataDesktop from './index.desktop'

export const characterLimit = 50
export const GeneralData = ({ error, isUpdate }: { error: any; isUpdate: boolean }) => {
  const { watch } = useFormContext()
  const [resume, isClinical, isInstitutional] = watch(['resume', 'isClinical', 'isInstitutional'])
  const isSmallDevice = useMediaQuery('sm')

  if (isSmallDevice) {
    return <GeneralDataMobile error={error} isUpdate={isUpdate} resume={resume} isClinical={isClinical} isInstitutional={isInstitutional} />
  }

  return <GeneralDataDesktop error={error} isUpdate={isUpdate} resume={resume} isClinical={isClinical} isInstitutional={isInstitutional} />
}

export default GeneralData

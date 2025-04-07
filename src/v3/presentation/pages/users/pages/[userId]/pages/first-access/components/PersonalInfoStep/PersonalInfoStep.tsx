import { useRouter } from 'next/router'
import { SubmitHandler } from 'react-hook-form'

import PersonalDataStep from '/public/assets/svg/User/FirstAccess/PersonalDataStep.svg'

import { CForm } from '@/components/Forms'
import { CardSkeleton } from '@/components/Skeletons/CardSkeleton'
import { spacing } from '@/utils/spacing'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { StepContainer } from '@/v3/presentation/components/CWizard/StepContainer'
import {
  FormPersonalData,
  useFormEditPersonalData,
} from '@/v3/presentation/pages/users/components/FormPersonalData'
import { IPersonalDataFormFields } from '@/v3/presentation/pages/users/components/FormPersonalData/schema'

export type PersonalInfoProps = {
  isLoading?: boolean
  onComplete: () => Promise<void>
}

export const PersonalInfoStep = ({ isLoading, onComplete }: PersonalInfoProps) => {
  const router = useRouter()
  const userId = Number(router.query.userId as string)

  const { form, isLoadingUpdateUser, isLoadingUser, onUpdateUser } = useFormEditPersonalData({
    userId,
  })

  const handleSubmit: SubmitHandler<IPersonalDataFormFields> = async (body) => {
    if (userId) {
      await onUpdateUser(body)
      await onComplete()
    }
  }

  if (isLoadingUser) {
    return <CardSkeleton />
  }

  return (
    <CForm id='myForm' form={form} onSubmit={handleSubmit}>
      <CBaseContainer
        boxShadow='none'
        buttonLabel='Próximo'
        isLoading={isLoadingUpdateUser || isLoading}
      >
        <StepContainer
          spacingDesk={spacing(5)}
          proportion={'4/8'}
          svg={PersonalDataStep}
          maxWidth={'1200px'}
          px={0}
          py={5}
        >
          <FormPersonalData />
        </StepContainer>
      </CBaseContainer>
    </CForm>
  )
}

import { useRouter } from 'next/router'
import { SubmitHandler } from 'react-hook-form'

import AddressStepSvg from '/public/assets/svg/User/FirstAccess/AddressStep.svg'

import { CForm } from '@/components/Forms'
import { CardSkeleton } from '@/components/Skeletons/CardSkeleton'
import { spacing } from '@/utils/spacing'
import { UserModel } from '@/v3/domain/@v2/users/users.model'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { StepContainer } from '@/v3/presentation/components/CWizard/StepContainer'
import { useFormEditAddress } from '@/v3/presentation/pages/users/components/FormAddress'
import { FormAddressFirstAccess } from '@/v3/presentation/pages/users/components/FormAddress/FormAddressFirstAccess'
import { IAddressFormFields } from '@/v3/presentation/pages/users/components/FormAddress/schema'

export type AddressStep = {
  user: UserModel
  isLoading?: boolean
  onComplete: () => Promise<void>
}

export const AddressStep = ({ isLoading, onComplete }: AddressStep) => {
  const router = useRouter()
  const userId = Number(router.query.userId as string)

  const {
    form,
    isLoadingMutate,
    isLoading: isLoadingFetch,
    onUpdateAddress,
  } = useFormEditAddress({
    userId,
  })

  const handleSubmit: SubmitHandler<IAddressFormFields> = async (body) => {
    if (userId) {
      await onUpdateAddress(body)
      await onComplete()
    }
  }

  if (isLoadingFetch) {
    return <CardSkeleton />
  }

  return (
    <CForm id='myForm' form={form} onSubmit={handleSubmit}>
      <CBaseContainer
        boxShadow='none'
        bottomMargin={0}
        buttonLabel='Próximo'
        isLoading={isLoadingMutate || isLoading}
      >
        <StepContainer
          spacingDesk={spacing(5)}
          proportion={'4/8'}
          svg={AddressStepSvg}
          maxWidth={'1200px'}
          px={0}
          py={5}
        >
          <FormAddressFirstAccess />
        </StepContainer>
      </CBaseContainer>
    </CForm>
  )
}

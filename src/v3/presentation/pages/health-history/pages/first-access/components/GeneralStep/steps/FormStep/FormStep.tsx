import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import GeneralStepSvg from '/public/assets/svg/HealthHistoric/FirstAccess/GeneralStep.svg'

import dayjs from 'dayjs'

import { CForm } from '@/components/Forms'
import { CardSkeleton } from '@/components/Skeletons/CardSkeleton'
import { BloodTypeOptions } from '@/constants/blood'
import { GenreOptions } from '@/constants/genre'
import { Genre } from '@/types/genre'
import { spacing } from '@/utils/spacing'
import { UserModel } from '@/v3/domain/@v2/users/users.model'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { StepContainer } from '@/v3/presentation/components/CWizard/StepContainer'
import { BloodTypeMapping, BloodTypeValueMapping } from '@/v3/presentation/enums/general-information.enum'
import { useFetchReadGeneralInformation } from '@/v3/presentation/hooks/api/@v2/health-history/general-information/useFetchReadGeneralInformation'
import { useMutateAddGeneralInformation } from '@/v3/presentation/hooks/api/@v2/health-history/general-information/useMutateAddGeneralInformation'
import { useMutateEditGeneralInformation } from '@/v3/presentation/hooks/api/@v2/health-history/general-information/useMutateEditGeneralInformation'
import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'
import { useMutateEditUser } from '@/v3/presentation/hooks/api/@v2/users/users/useMutateEditUser'
import { useCWizardUrlControlContext } from '@/v3/presentation/hooks/useCWizardUrlControl'
import PageTitle from '@/v3/presentation/newComponents/layout/PageTitle'
import { FormGeneralData } from '@/v3/presentation/pages/health-history/components/FormGeneralData'
import {
  IGeneralDataFormFields,
  schemaGeneralData,
} from '@/v3/presentation/pages/health-history/components/FormGeneralData/schema'

export interface FormStepProps {
  user: UserModel
  isLoading?: boolean
}

export const FormStep = ({ isLoading }: FormStepProps) => {
  const { nextStep } = useCWizardUrlControlContext()
  const router = useRouter()
  const userId = Number(router.query.userId as string)
  const form = useForm({
    resolver: yupResolver(schemaGeneralData),
    defaultValues: {
      birthDate: null as string | null,
      genre: null as Genre | null,
      bloodType: null as string | null,
    },
  })

  const { mutateAsync: addGeneralInformationMutate, isPending: isLoadingGeneralInfo } =
  useMutateAddGeneralInformation()
  const { mutateAsync: editGeneralInformationMutate, isPending: isLoadingEditGeneralInfo } =
  useMutateEditGeneralInformation()
  const { mutateAsync: updateUserMutate, isPending: isLoadingUpdateUser } = useMutateEditUser()
  const { generalInformation, isPending: isLoadingUserInfo } = useFetchReadGeneralInformation({ userId })
  const { user: userData, isPending: isLoadingUser } = useFetchReadUser({ userId })

  const isLoadingSubmit = isLoadingUpdateUser || isLoadingGeneralInfo || isLoadingEditGeneralInfo || isLoading 

  useEffect(() => {
    if (userData && generalInformation) {
      const date = userData?.birthday?.toString() || ''
      form.reset({
        birthDate: date,
        genre: userData?.genre,
        bloodType: generalInformation.bloodType ? BloodTypeValueMapping[generalInformation.bloodType] : undefined,
      })
    }
  }, [userData, generalInformation, form])

  const handleSubmit: SubmitHandler<IGeneralDataFormFields> = async ({
    bloodType,
    birthDate,
    genre,
  }) => {
    if (!userId) return

    if (bloodType) {
      if (generalInformation?.id) await editGeneralInformationMutate({
        bloodType: BloodTypeMapping[bloodType],
        userId: userId,
      })

      if (!generalInformation?.id) await addGeneralInformationMutate({
        bloodType: BloodTypeMapping[bloodType],
        userId: userId,
      })
    }

    await updateUserMutate({
      userId: userId,
      genre: genre!,
      birthday: dayjs(birthDate).toDate(),
    })

    nextStep?.()
  }

  if (isLoadingUser || isLoadingUserInfo) {
    return <CardSkeleton />
  }

  return (
    <CForm id='myForm' form={form} onSubmit={handleSubmit}>
      <CBaseContainer boxShadow='none' buttonLabel='Próximo' isLoading={isLoadingSubmit}>
        <StepContainer
          spacingDesk={spacing(5)}
          proportion={'4/8'}
          svg={GeneralStepSvg}
          maxWidth={'1200px'}
          px={0}
          py={5}
        >
          <PageTitle mb={3}>Para começar, precisamos de alguns dados:</PageTitle>
          <FormGeneralData bloodTypeOptions={BloodTypeOptions} genderOptions={GenreOptions} />
        </StepContainer>
      </CBaseContainer>
    </CForm>
  )
}

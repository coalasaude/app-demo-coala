import { Skeleton } from '@mui/material'
import { useRouter } from 'next/router'

import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { FirstFillingType } from '@/v3/domain/UserFirstFills'
import { PersonalDataSteps } from '@/v3/domain/UserPersonalDataFills'
import { CStepper } from '@/v3/presentation/newComponents/layout/CStepper'
import { useFetchPersonalDataFirsFilling } from '@/v3/presentation/hooks/api/first-filling/useFetchPersonalDataFirsFilling'
import { useFirstFillsControlSteps } from '@/v3/presentation/pages/health-history/pages/first-access/hooks/useFirstFillsControl'
import { PageHeader } from '@/v3/presentation/newComponents'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

import { AddressStep } from './components/AddressStep'
import { PersonalInfoStep } from './components/PersonalInfoStep'
import { FinalStep } from './components/FinalStep'
import { HealthInsuranceStep } from './components/HealthInsuranceStep'
import { ProfessionalReferenceStep } from './components/ProfessionalReferenceStep'

export const PersonalDataFirstAccessPage = () => {
  const router = useRouter()
  const userId = Number(router.query.userId as string)
  const { auth } = useAuth()

  const { data, isLoadingFirstFills } = useFetchPersonalDataFirsFilling({
    userId: userId,
  })

  const {
    step,
    user,
    stepperRef,
    onGoBack,
    onEndStep,
    isLoadingCreateFirstFills,
    onInitStep,
    onSkipStep,
  } = useFirstFillsControlSteps<PersonalDataSteps>({
    userId,
    type: FirstFillingType.PERSONAL_DATA,
    startStep: data?.actualStep,
  })

  const onConfirm = async () => {
    let id: number

    if (auth?.userId === userId) {
      id = auth.userId
    } else {
      id = userId
    }

    router.push(bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.VIEW.path, { userId: id }))
  }

  return (
    <>
      <PageHeader
        title={
          auth?.userId === userId
            ? 'Meus dados cadastrais'
            : `Dados cadastrais d${user?.getGenreArticle()} ${user?.name}`
        }
        onBack={onGoBack}
      />
      {!user || isLoadingFirstFills || !step ? (
        <Skeleton variant='rectangular' height={400} />
      ) : (
        <>
          <CStepper
            ref={stepperRef}
            activeStep={step}
            steps={['Infos. pessoais', 'Endereço', 'Convênios', ' Profissional de saúde']}
          >
            <PersonalInfoStep
              key={PersonalDataSteps.INITIATE}
              onComplete={onEndStep(PersonalDataSteps.PERSONAL_INFO)}
              isLoading={isLoadingCreateFirstFills}
            />
            <AddressStep
              key={PersonalDataSteps.ADDRESS}
              user={user}
              onComplete={onEndStep(PersonalDataSteps.ADDRESS)}
              isLoading={isLoadingCreateFirstFills}
            />
            <HealthInsuranceStep
              key={PersonalDataSteps.HEALTH_INSURANCE}
              user={user}
              onConfirm={onEndStep(PersonalDataSteps.HEALTH_INSURANCE)}
              onStart={onInitStep(PersonalDataSteps.HEALTH_INSURANCE)}
              onSkip={onSkipStep(PersonalDataSteps.HEALTH_INSURANCE)}
            />
            <ProfessionalReferenceStep
              key={PersonalDataSteps.PROFESSIONAL_REFERENCE}
              user={user}
              onConfirm={onEndStep(PersonalDataSteps.PROFESSIONAL_REFERENCE)}
              onStart={onInitStep(PersonalDataSteps.PROFESSIONAL_REFERENCE)}
              onSkip={onSkipStep(PersonalDataSteps.PROFESSIONAL_REFERENCE)}
            />
            <FinalStep
              key={PersonalDataSteps.FINISHED}
              onConfirm={onConfirm}
              isLoading={isLoadingCreateFirstFills}
            />
          </CStepper>
        </>
      )}
    </>
  )
}

import { Skeleton } from '@mui/material'
import { useRouter } from 'next/router'

import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { FirstFillingType } from '@/v3/domain/UserFirstFills'
import { HealthHistorySteps } from '@/v3/domain/UserHealthHistoricFills'
import { CStepper } from '@/v3/presentation/newComponents/layout/CStepper'
import { useFetchHealthHistoryFirsFilling } from '@/v3/presentation/hooks/api/first-filling/useFetchHealthHistoryFirsFilling'
import { PageHeader } from '@/v3/presentation/newComponents'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

import { AllergyStep } from './components/AllergyStep'
import { DiseasesStep } from './components/DiseasesStep'
import { FinalStep } from './components/FinalStep'
import { GeneralStep } from './components/GeneralStep'
import { MedicineStep } from './components/MedicineStep'
import { VaccineStep } from './components/VaccineStep'
import { useFirstFillsControlSteps } from './hooks/useFirstFillsControl'

export const HealthHistoricFirstAccess = () => {
  const router = useRouter()
  const userId = Number(router.query.userId as string)
  const { auth } = useAuth()

  const { data, isLoadingFirstFills } = useFetchHealthHistoryFirsFilling({
    userId: userId,
  })

  const {
    step,
    user,
    stepperRef,
    onGoBack,
    onInitStep,
    onEndStep,
    onSkipStep,
    onEndFill,
    isLoadingCreateFirstFills,
  } = useFirstFillsControlSteps({
    userId,
    type: FirstFillingType.HEALTH_HISTORY,
    startStep: data?.actualStep,
    onEndFill: async () => {
      await router.push(
        bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.HEALTH_HISTORIC.path, { userId }),
      )
    },
  })

  return (
    <>
      <PageHeader
        title={
          auth?.userId === userId
            ? 'Minha ficha de saúde'
            : `Ficha de saúde d${user?.getGenreArticle()} ${user?.name}`
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
            steps={['Gerais', 'Alergias', 'Doenças', 'Medicamentos', 'Vacinas']}
          >
            <GeneralStep
              key={HealthHistorySteps.INITIATE}
              user={user}
              onComplete={onEndStep(HealthHistorySteps.GENERAL_INFORMATION)}
            />
            <AllergyStep
              key={HealthHistorySteps.ALLERGY}
              user={user}
              onConfirm={onEndStep(HealthHistorySteps.ALLERGY)}
              onStart={onInitStep(HealthHistorySteps.ALLERGY)}
              onSkip={onSkipStep(HealthHistorySteps.ALLERGY)}
            />
            <DiseasesStep
              key={HealthHistorySteps.DISEASE}
              user={user}
              onConfirm={onEndStep(HealthHistorySteps.DISEASE)}
              onStart={onInitStep(HealthHistorySteps.DISEASE)}
              onSkip={onSkipStep(HealthHistorySteps.DISEASE)}
            />
            <MedicineStep
              key={HealthHistorySteps.MEDICINE}
              user={user}
              onConfirm={onEndStep(HealthHistorySteps.MEDICINE)}
              onStart={onInitStep(HealthHistorySteps.MEDICINE)}
              onSkip={onSkipStep(HealthHistorySteps.MEDICINE)}
            />
            <VaccineStep
              key={HealthHistorySteps.VACCINE}
              user={user}
              onConfirm={onEndStep(HealthHistorySteps.VACCINE)}
              onStart={onInitStep(HealthHistorySteps.VACCINE)}
              onSkip={onSkipStep(HealthHistorySteps.VACCINE)}
            />
            <FinalStep
              key={HealthHistorySteps.FINISHED}
              onConfirm={onEndFill}
              isLoading={isLoadingCreateFirstFills}
              user={user}
            />
          </CStepper>
        </>
      )}
    </>
  )
}

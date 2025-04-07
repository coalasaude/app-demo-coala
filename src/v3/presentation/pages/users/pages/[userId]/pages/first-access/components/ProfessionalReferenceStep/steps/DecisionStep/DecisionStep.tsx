import { useRouter } from 'next/router'

import HealthInsuranceStepSvg from '/public/assets/svg/User/FirstAccess/HealthInsuranceStep.svg'

import { FormPageButtons } from '@/v3/presentation/components/FormButtons'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { useCWizardUrlControlContext } from '@/v3/presentation/hooks/useCWizardUrlControl'
import { useLoadingFeedback } from '@/v3/presentation/hooks/useLoadingFeedback'
import { StepContainer } from '@/v3/presentation/components/CWizard/StepContainer'
import { StepContainerInfo } from '@/v3/presentation/components/CWizard/StepContainer/StepContainerInfo'
import { BaseDecisionStepProps } from '@/v3/presentation/pages/health-history/pages/first-access/types'
import { StepContainerTitle } from '@/v3/presentation/components/CWizard/StepContainer/StepContainerTitle'

export type DecisionStepProps = BaseDecisionStepProps

export const DecisionStep = ({ user, onSkip, onStart }: DecisionStepProps) => {
  const router = useRouter()
  const userId = Number(router.query.userId as string)
  const { auth } = useAuth()
  const { nextStep } = useCWizardUrlControlContext()
  const { execute: executeSkip, isLoading: isSkipLoading } = useLoadingFeedback(onSkip)
  const { execute: executeStart, isLoading: isStartLoading } = useLoadingFeedback(onStart)

  const handleStart = async () => {
    await executeStart()
    nextStep?.()
  }

  return (
    <StepContainer svg={HealthInsuranceStepSvg}>
      <StepContainerTitle>
        {auth?.userId === userId ? 'Você' : user.name} é acompanhado por algum profissional de
        saúde?
      </StepContainerTitle>
      <FormPageButtons
        isLoading={isStartLoading || isSkipLoading}
        justifyContent={['center', 'center', 'flex-start']}
        onCancel={executeSkip}
        onConfirm={handleStart}
        minWidth={['100%', '120px']}
        cancelLabel='Não'
        confirmLabel='Sim'
      />
      <StepContainerInfo mt={8}>
        Se sim, por favor, compartilhe conosco. Queremos unir esforços para garantir o melhor
        cuidado possível para a{' '}
        {auth?.userId === userId ? 'sua saúde' : `saúde d${user.getGenreArticle()} ${user.name}`}.
      </StepContainerInfo>
    </StepContainer>
  )
}

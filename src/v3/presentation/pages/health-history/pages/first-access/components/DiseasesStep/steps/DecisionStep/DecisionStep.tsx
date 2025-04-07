import DiseasesSepStepSvg from '/public/assets/svg/HealthHistoric/FirstAccess/DiseasesSep.svg'

import { spacing } from '@/utils/spacing'
import { StepContainer } from '@/v3/presentation/components/CWizard/StepContainer'
import { StepContainerInfo } from '@/v3/presentation/components/CWizard/StepContainer/StepContainerInfo'
import { StepContainerTitle } from '@/v3/presentation/components/CWizard/StepContainer/StepContainerTitle'
import { FormPageButtons } from '@/v3/presentation/components/FormButtons'
import { useCWizardUrlControlContext } from '@/v3/presentation/hooks/useCWizardUrlControl'
import { useLoadingFeedback } from '@/v3/presentation/hooks/useLoadingFeedback'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { BaseDecisionStepProps } from '@/v3/presentation/pages/health-history/pages/first-access/types'

export type DecisionStepProps = BaseDecisionStepProps

export const DecisionStep = ({ user, onSkip, onStart }: DecisionStepProps) => {
  const userId = user.id
  const { auth } = useAuth()
  const { nextStep } = useCWizardUrlControlContext()
  const { execute: executeSkip, isLoading: isSkipLoading } = useLoadingFeedback(onSkip)
  const { execute: executeStart, isLoading: isStartLoading } = useLoadingFeedback(onStart)

  const handleAdd = async () => {
    await executeStart()
    nextStep?.()
  }

  return (
    <StepContainer svg={DiseasesSepStepSvg}>
      <StepContainerTitle>
        {auth?.userId === userId ? 'Você' : user.name} possui alguma doença diagnosticada?
      </StepContainerTitle>
      <FormPageButtons
        isLoading={isStartLoading || isSkipLoading}
        justifyContent={['center', 'center', 'flex-start']}
        onCancel={executeSkip}
        onConfirm={handleAdd}
        minWidth={['100%', '120px']}
        cancelLabel='Não'
        confirmLabel='Sim'
      />
      <StepContainerInfo mt={spacing(8)}>
        {auth?.userId === userId ? 'Você' : user.name} apresenta algum diagnóstico de doença? Se
        sim, esse é o espaço ideal para você compartilhar com a nossa equipe os diagnósticos e
        demais informações necessárias.
      </StepContainerInfo>
    </StepContainer>
  )
}

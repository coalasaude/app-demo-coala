import VaccineStepSvg from '/public/assets/svg/HealthHistoric/FirstAccess/VaccineStep.svg'

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
    <StepContainer svg={VaccineStepSvg}>
      <StepContainerTitle>
        Agora é a hora de você cadastrar os{' '}
        {auth?.userId === userId
          ? 'seus comprovantes de vacinação.'
          : 'comprovantes de vacinação de seu dependente.'}
      </StepContainerTitle>
      <StepContainerTitle variant='h5' color='var(--mui-palette-grey-500)' mt={-2}>
        Para o cadastro ser um sucesso, é importante ter em mãos a{' '}
        {auth?.userId === userId
          ? 'sua carteira de vacinação.'
          : `carteira de vacinação d${user.getGenreArticle()} ${user.name}.`}
      </StepContainerTitle>
      <FormPageButtons
        isLoading={isStartLoading || isSkipLoading}
        justifyContent={['center', 'center', 'flex-start']}
        onCancel={executeSkip}
        fullWidth
        onConfirm={handleAdd}
        minWidth={['100%', '190px']}
        cancelLabel='Cadastrar depois'
        confirmLabel='Quero cadastrar'
      />
      <StepContainerInfo mt={spacing(8)}>
        Está sem os documentos necessários? Não se preocupe, você pode cadastrar as vacinas depois.
      </StepContainerInfo>
    </StepContainer>
  )
}

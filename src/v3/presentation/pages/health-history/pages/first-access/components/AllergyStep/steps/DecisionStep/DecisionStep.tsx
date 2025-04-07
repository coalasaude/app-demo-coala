import AllergyStepSvg from '/public/assets/svg/HealthHistoric/FirstAccess/AllergyStep.svg'

import { spacing } from '@/utils/spacing'
import { StepContainer } from '@/v3/presentation/components/CWizard/StepContainer'
import { StepContainerInfo } from '@/v3/presentation/components/CWizard/StepContainer/StepContainerInfo'
import { StepContainerTitle } from '@/v3/presentation/components/CWizard/StepContainer/StepContainerTitle'
import { FormPageButtons } from '@/v3/presentation/components/FormButtons'
import { useCWizardUrlControlContext } from '@/v3/presentation/hooks/useCWizardUrlControl'
import { useLoadingFeedback } from '@/v3/presentation/hooks/useLoadingFeedback'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { BaseDecisionStepProps } from '@/v3/presentation/pages/health-history/pages/first-access/types'
import { useMutateEditUser } from '@/v3/presentation/hooks/api/@v2/users/users/useMutateEditUser'

export type DecisionStepProps = BaseDecisionStepProps

export const DecisionStep = ({ user, onSkip, onStart }: DecisionStepProps) => {
  const { nextStep } = useCWizardUrlControlContext()
  const userId = user.id
  const { auth } = useAuth()
  const { execute: executeSkip, isLoading: isSkipLoading } = useLoadingFeedback(onSkip)
  const { execute: executeStart, isLoading: isStartLoading } = useLoadingFeedback(onStart)
  const { mutateAsync: updateUser } = useMutateEditUser()

  const handleAddAllergy = async () => {
    await executeStart()
    nextStep?.()
  }

  const handleCancel = async () => {
    await updateUser({ deniesAllergies: true, userId })
    executeSkip()
  }

  return (
    <StepContainer svg={AllergyStepSvg}>
      <StepContainerTitle>
        {auth?.userId === userId ? 'Você' : user.name} possui algum tipo de alergia?
      </StepContainerTitle>
      <FormPageButtons
        isLoading={isStartLoading || isSkipLoading}
        justifyContent={['center', 'center', 'flex-start']}
        onCancel={handleCancel}
        onConfirm={handleAddAllergy}
        minWidth={['100%', '120px']}
        cancelLabel='Não'
        confirmLabel='Sim'
      />
      <StepContainerInfo mt={spacing(8)}>
        Compartilhe as{' '}
        {auth?.userId === userId
          ? 'suas alergias'
          : ` alergias d${user.getGenreArticle()} ${user.name}`}{' '}
        com a nossa equipe de saúde, seja ela relacionada a medicamentos, alimentos, insetos ou
        outros.
      </StepContainerInfo>
    </StepContainer>
  )
}

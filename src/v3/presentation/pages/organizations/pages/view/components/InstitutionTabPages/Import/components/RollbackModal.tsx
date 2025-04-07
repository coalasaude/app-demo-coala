import { CDialogue } from '@/v3/presentation/components/Modal'
import { useMutateRollbackUserOnboarding } from '@/v3/presentation/hooks/api/@v2/import/useMutateRollbackUserOnboarding'

type RollbackModalProps = {
  onboardingId: number
}

export const RollbackModal = ({ onboardingId }: RollbackModalProps) => {
  const rollbackMutate = useMutateRollbackUserOnboarding()

  const onConfirm = async () => {
    await rollbackMutate.mutateAsync({ onboardingId })
  }

  return (
    <CDialogue
      title='Rollback de importação'
      confirmButtonLabel='Continuar'
      cancelButtonLabel='Cancelar'
      onConfirm={onConfirm}
      description={
        <span>
          Usuários importados e seus perfis serão excluídos. Usuários pré-existentes não serão
          afetados, exceto pelos perfis criados na importação.
          <div style={{ marginTop: '16px' }} />
          Deseja continuar?
        </span>
      }
    />
  )
}

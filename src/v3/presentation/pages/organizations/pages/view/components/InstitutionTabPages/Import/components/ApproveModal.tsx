import { CDialogue } from '@/v3/presentation/components/Modal'
import { useMutateApproveUserOnboarding } from '@/v3/presentation/hooks/api/@v2/import/useMutateApproveUserOnboarding'

type ApproveModalProps = {
  onboardingId: number
}

export const ApproveModal = ({ onboardingId }: ApproveModalProps) => {
  const approveMutate = useMutateApproveUserOnboarding()

  const onConfirm = async () => {
    await approveMutate.mutateAsync({ onboardingId })
  }

  return (
    <CDialogue
      title='Aprovar importação'
      confirmButtonLabel='Continuar'
      cancelButtonLabel='Cancelar'
      onConfirm={onConfirm}
      description={
        <span>
          Todos os usuários importados serão habilitados para acessar a plataforma, enquanto os já
          existentes terão seus perfis ativados.
          <br />
          <br />
          <strong>Nenhuma notificação de ativação será enviada aos importados.</strong>
          <div style={{ marginTop: '16px' }} />
          Deseja continuar?
        </span>
      }
    />
  )
}

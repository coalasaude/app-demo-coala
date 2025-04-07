import { Typography } from '@mui/material'

import { CDialogue } from '@/v3/presentation/components/Modal'

type ConfirmationModalProps = {
  onConfirm: (profileId: number, institutionId: number) => Promise<void>
  userName: string
  roles: {
    profile: {
      id: number
    }
    institutionId?: number
  }[]
}

export const ConfirmationModal = ({ onConfirm, userName, roles }: ConfirmationModalProps) => {
  return (
    <CDialogue
      title='Atenção'
      confirmButtonLabel='Sim'
      cancelButtonLabel='Não'
      onConfirm={async () => await onConfirm(roles[0].profile.id, roles[0].institutionId || 0)}
      description={
        <>
          <Typography>
            Você tem certeza que deseja vincular <strong>{userName}</strong> novamente à sua
            instituição?
          </Typography>
          <Typography>
            Esse usuário já está com o status <strong>ativo</strong> na plataforma da Coala e
            passará a integrar sua instituição.
          </Typography>
        </>
      }
    />
  )
}

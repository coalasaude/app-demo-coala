import BlockIcon from '@mui/icons-material/Block'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { Typography } from '@mui/material'

import { ModalCard, useModalContext } from '@/v3/presentation/components/Modal'

import { StyledButton, StyledContainer, StyledModalTitle } from './styles'

export interface IConfirmationModalProps {
  variant: 'VALID' | 'INVALID'
  institutionName?: string
  onConfirm: () => void
}

const ConfirmationModal: React.FC<IConfirmationModalProps> = ({
  variant,
  institutionName,
  onConfirm,
}) => {
  const { handleModal } = useModalContext()

  const titleMap: Record<IConfirmationModalProps['variant'], string> = {
    VALID: 'Validar Indicação',
    INVALID: 'Invalidar Indicação',
  }

  const iconMap: Record<IConfirmationModalProps['variant'], React.ReactNode> = {
    VALID: <CheckCircleOutlineIcon />,
    INVALID: <BlockIcon />,
  }

  const contentMap: Record<IConfirmationModalProps['variant'], string> = {
    VALID: `Deseja confirmar a indicação da escola ${institutionName} como válida?`,
    INVALID: `Deseja confirmar a indicação da escola ${institutionName} como inválida?`,
  }

  const handleOnConfirm = () => {
    onConfirm()
    handleModal()
  }

  return (
    <ModalCard icon={iconMap[variant]}>
      <StyledContainer>
        <StyledModalTitle>{titleMap[variant]}</StyledModalTitle>

        <Typography variant='body2'>{contentMap[variant]}</Typography>

        <StyledButton onClick={handleOnConfirm}>Confirmar</StyledButton>
      </StyledContainer>
    </ModalCard>
  )
}

export default ConfirmationModal

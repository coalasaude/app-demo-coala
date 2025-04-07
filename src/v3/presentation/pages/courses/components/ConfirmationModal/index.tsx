import { Box } from '@mui/material'

import { ModalCard, useModalContext } from '@/v3/presentation/components/Modal'

import { StyledButton, StyledContainer, StyledModalTitle, StyledSubtitle } from './styles'

export interface IConfirmationModalProps {
  onConfirm: () => void
  text: string
  subtitle?: string
}

const ConfirmationModal: React.FC<IConfirmationModalProps> = ({ onConfirm, text, subtitle }) => {
  const { handleModal } = useModalContext()

  const handleOnConfirm = () => {
    onConfirm()
    handleModal()
  }

  return (
    <ModalCard>
      <StyledContainer>
        <StyledModalTitle>{text}</StyledModalTitle>
        {subtitle && <StyledSubtitle variant='subtitle1'>{subtitle}</StyledSubtitle>}
        <Box display='flex' alignItems='center' justifyContent='end' gap={2}>
          <StyledButton onClick={() => handleModal()} variant='outlined'>
            Cancelar
          </StyledButton>
          <StyledButton onClick={handleOnConfirm}>Confirmar</StyledButton>
        </Box>
      </StyledContainer>
    </ModalCard>
  )
}

export default ConfirmationModal

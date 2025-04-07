import { useState } from 'react'
import { CircularProgress, Stack } from '@mui/material'

import { ModalCard, useModalContext } from '@/v3/presentation/components/Modal'
import { spacing } from '@/utils/spacing'

import { StyledButton, StyledContainer, StyledModalDescription, StyledModalTitle } from './styles'
import { CDialogueProps } from './types'

export const CDialogue: React.FC<CDialogueProps> = ({
  onConfirm,
  title,
  description,
  confirmButtonLabel = 'Confirmar',
  confirmButtonVariant = 'contained',
  cancelButtonLabel = 'Cancelar',
  cancelButtonVariant = 'outlined',
  onClose,
  onCancel,
  descriptionProps,
  keepOpenOnConfirm,
  disabled = false,
}) => {
  const { handleModal } = useModalContext()
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    setIsLoading(true)
    await onConfirm()?.finally(() => setIsLoading(false))
    if (!keepOpenOnConfirm) handleClose()
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    } else {
      handleModal()
    }
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      handleClose()
    }
  }

  return (
    <ModalCard onClose={handleClose}>
      <StyledContainer pt={title ? undefined : spacing(2)}>
        {title && <StyledModalTitle variant='h2'>{title}</StyledModalTitle>}
        <StyledModalDescription variant='body1' {...descriptionProps}>
          {description}
        </StyledModalDescription>
        <Stack spacing={2} direction='row' justifyContent='flex-end'>
          <StyledButton fullWidth size='small' onClick={handleCancel} variant={cancelButtonVariant}>
            {cancelButtonLabel}
          </StyledButton>
          <StyledButton
            fullWidth
            size='small'
            onClick={handleConfirm}
            variant={confirmButtonVariant}
            disabled={disabled}
          >
            {isLoading ? <CircularProgress color='inherit' size={20} /> : confirmButtonLabel}
          </StyledButton>
        </Stack>
      </StyledContainer>
    </ModalCard>
  )
}

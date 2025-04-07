import { Stack, Typography } from '@mui/material'

import { ModalCard, useModalContext } from '@/v3/presentation/components/Modal'

import CStepper from '../CStepper'

import { StyledButton, StyledContainer } from './styles'
import { CDialogueProps } from './types'

export const CDialogueWithSteps: React.FC<CDialogueProps> = ({
  onConfirm,
  title,
  confirmButtonLabel = 'Confirmar',
  cancelButtonLabel = 'Cancelar',
  onClose,
  children,
  stepsInfo,
  step,
  stepperRef,
  onGoBack,
  isLoading,
}) => {
  const { handleModal } = useModalContext()

  const handleConfirm = async () => {
    await onConfirm()
    handleModal()
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    } else {
      handleModal()
    }
  }

  const handleGoBack = () => {
    onGoBack()
  }

  const handleReturnButton = () => {
    if (cancelButtonLabel === 'Cancelar') {
      return handleClose()
    }

    return handleGoBack()
  }

  return (
    <ModalCard
      onClose={handleClose}
      sx={{ width: 384, height: 390, position: 'relative', padding: 2 }}
    >
      <StyledContainer>
        <Typography variant='h2'>{title}</Typography>

        <CStepper
          ref={stepperRef}
          activeStep={step}
          steps={stepsInfo}
          noPadding
          boxProps={{ pt: 2 }}
          stepProps={{ sx: { px: 2 } }}
        >
          {children}
        </CStepper>
        <Stack
          spacing={1}
          direction='row'
          justifyContent='flex-end'
          position='absolute'
          bottom={10}
          right={10}
        >
          <StyledButton variant='outlined' onClick={handleReturnButton} disabled={isLoading}>
            {cancelButtonLabel}
          </StyledButton>
          <StyledButton disabled={isLoading} onClick={handleConfirm}>
            {confirmButtonLabel}
          </StyledButton>
        </Stack>
      </StyledContainer>
    </ModalCard>
  )
}

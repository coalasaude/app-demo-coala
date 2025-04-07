import { Box, Button } from '@mui/material'

import { FormButtonsProps } from './types'

export const FormButtons = ({
  isLoading,
  onCancel,
  onConfirm,
  confirmLabel = 'Salvar',
  cancelLabel = 'Cancelar',
  confirmButtonProps,
  cancelVariant,
  minWidth,
  maxWidth,
  minWidthCancel = minWidth,
  hideMobile,
  disableConfirm,
  disableCancel,
  startIcon,
  endIcon,
  formId = 'myForm',
  buttonProps,
  fullWidth,
  buttonFlex,
  ...props
}: FormButtonsProps) => {
  return (
    <Box display={hideMobile ? ['none', 'flex'] : 'flex'} gap={2} flex={1} {...props}>
      {onCancel && (
        <Box flex={[buttonFlex ? 0 : 1, 0]}>
          <Button
            fullWidth={!!fullWidth || (!minWidthCancel && !maxWidth)}
            style={{ borderRadius: '8px' }}
            variant={cancelVariant || 'outlined'}
            color='primary'
            onClick={onCancel}
            disabled={isLoading || disableCancel}
            sx={{ minWidth: minWidthCancel, maxWidth }}
            {...buttonProps}
          >
            {cancelLabel}
          </Button>
        </Box>
      )}
      <Box flex={[buttonFlex ? 0 : 1, 0]}>
        <Button
          fullWidth={!!fullWidth || (!minWidthCancel && !maxWidth)}
          variant='contained'
          color='primary'
          type={onConfirm ? 'button' : 'submit'}
          form={formId}
          disabled={isLoading || disableConfirm}
          onClick={onConfirm}
          style={{ borderRadius: '8px' }}
          sx={{ minWidth, maxWidth, ...confirmButtonProps }}
          startIcon={startIcon}
          endIcon={endIcon}
          {...buttonProps}
        >
          {isLoading ? 'Carregando...' : confirmLabel}
        </Button>
      </Box>
    </Box>
  )
}

import { BoxProps, ButtonProps, SxProps } from '@mui/material'

export type FormButtonsProps = {
  onConfirm?: () => void
  onCancel?: () => void
  isLoading?: boolean
  confirmLabel?: string
  cancelLabel?: string
  cancelVariant?: 'text' | 'outlined' | 'contained'
  hideMobile?: boolean
  disableConfirm?: boolean
  disableCancel?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  minWidthCancel?: BoxProps['minWidth']
  formId?: string
  buttonProps?: ButtonProps
  fullWidth?: boolean
  confirmButtonProps?: SxProps
  buttonFlex?: boolean
} & BoxProps

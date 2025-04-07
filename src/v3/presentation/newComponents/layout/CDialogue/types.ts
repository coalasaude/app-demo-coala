import { TypographyProps } from '@mui/material'
import { ReactNode } from 'react'

export interface CDialogueProps {
  onConfirm: () => Promise<void> | void
  onCancel?: () => void
  onClose?: () => void
  title?: string
  description: ReactNode
  confirmButtonLabel: string
  cancelButtonLabel?: string | ReactNode
  confirmButtonVariant?: 'contained' | 'outlined' | 'text'
  cancelButtonVariant?: 'contained' | 'outlined' | 'text'
  descriptionProps?: TypographyProps
  keepOpenOnConfirm?: boolean
  disabled?: boolean
}

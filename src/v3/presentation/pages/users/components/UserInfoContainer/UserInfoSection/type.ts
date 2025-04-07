import { BoxProps } from '@mui/material'
import { ReactNode } from 'react'

export type UserInfoSectionProps = {
  onEdit?: () => void
  buttonLabel?: ReactNode
  title: string
  buttonIcon?: ReactNode
  variant?: 'icon' | 'text' | 'onlyTitle'
  children: ReactNode
  buttonVariant?: 'text' | 'outlined' | 'contained'
} & BoxProps

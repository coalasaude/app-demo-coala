import { FC, ReactNode } from 'react'
import { CircularProgress, ButtonProps as MaterialButtonProps } from '@mui/material'

import { StyledButton } from './styles'

export interface ButtonProps extends MaterialButtonProps {
  children: ReactNode
  variant?: 'contained' | 'outlined' | 'text'
  fullWidthOnSmallDevice?: boolean
  loading?: boolean
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'contained',
  fullWidthOnSmallDevice,
  loading,
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      disabled={loading || disabled}
      variant={variant}
      $fullWidthOnSmallDevice={fullWidthOnSmallDevice}
      {...props}
    >
      {children}
      {loading && <CircularProgress sx={{ ml: 2 }} size={15} color='inherit' />}
    </StyledButton>
  )
}

export default Button

export { StyledButtonsWrapper as ButtonsWrapper } from './styles'

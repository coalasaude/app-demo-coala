import { FC, ReactNode } from 'react'
import { ButtonProps as MaterialButtonProps } from '@mui/material'

import { StyledSquareButton } from './styles'

export interface ButtonProps extends MaterialButtonProps {
  children: ReactNode
}

export const SquareButton: FC<ButtonProps> = (props) => <StyledSquareButton {...props} />

export default SquareButton

import { BoxProps } from '@mui/material'

import { Container as StyledContainer } from './styles'

type Props = {
  children: React.ReactNode[]
}

export const Container = ({ children, ...props }: Props & BoxProps) => {
  return <StyledContainer {...props}>{children}</StyledContainer>
}

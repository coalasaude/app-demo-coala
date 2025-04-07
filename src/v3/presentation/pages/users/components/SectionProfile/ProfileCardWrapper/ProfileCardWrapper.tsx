import { BoxProps } from '@mui/material'
import React from 'react'

import { StyledProfileWrapper } from './styles'

interface Props {
  children: React.ReactNode & BoxProps
}
export const ProfileCardWrapper = ({ children }: Props) => {
  return <StyledProfileWrapper>{children}</StyledProfileWrapper>
}

export default ProfileCardWrapper

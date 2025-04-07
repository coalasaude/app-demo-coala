import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Paper, PaperProps } from '@mui/material'
import { styled } from '@mui/material/styles'

import { breakpoint } from '@/utils/breakpoints'

import { spacing } from '../../utils/spacing'

export const StyledArrowBackIcon = styled(ArrowBackIcon)`
  color: var(--mui-palette-primary-main);
  cursor: pointer;
`

export const StyledAppBarContainer = styled('div')`
  width: 100%;
`

export const StyledAppBar = styled(Paper)<PaperProps>`
  align-items: center;
  border: none;
  display: flex;
  height: ${spacing(6)};
  height: ${({ theme }) => theme.spacing(6)};

  width: 100%;
  background-color: transparent;
  box-shadow: none;

  @media (min-width: ${breakpoint('md')}) {
    border-radius: 12px;
  }
`

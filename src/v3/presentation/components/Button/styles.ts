import { Box, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

import { breakpoint } from '@/utils/breakpoints'

import { ButtonProps } from '.'

export const StyledButton = styled(Button)<ButtonProps & { $fullWidthOnSmallDevice?: boolean }>`
  font-size: 14px !important;
  font-weight: normal !important;
  border-radius: 8px !important;

  ${({ fullWidthOnSmallDevice }) =>
    fullWidthOnSmallDevice &&
    `
  @media (max-width: ${breakpoint('sm')}) {
    width: 100%;
  }
  `}
`

export const StyledButtonsWrapper = styled(Box)`
  justify-content: flex-end;
  padding-top: ${({ theme }) => theme.spacing(1)};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};

  @media (max-width: ${breakpoint('sm')}) {
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    right: 0;
    margin-right: 8px;
    background-color: ${({ theme }) => theme.palette.background.paper};
    width: calc(100% - 16px);
  }
`

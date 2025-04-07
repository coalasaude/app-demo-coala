import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledCloseContainer = styled(Box)`
  position: absolute;
  z-index: 99;
  top: 0;
  right: 0;
  padding: ${({ theme }) => theme.spacing(3)} 0;
  padding-right: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => theme.breakpoints.up('sm')} {
    display: none;
  }
`

import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledButtonContainer = styled(Box)`
  ${({ theme }) => theme.breakpoints.down('sm')} {
    position: absolute;
    top: ${({ theme }) => theme.spacing(2)};
    right: ${({ theme }) => theme.spacing(2)};
  }
`

import { Box, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledButton = styled(Button)`
  min-width: ${({ theme }) => theme.spacing(14)};
  max-width: ${({ theme }) => theme.spacing(4)};
`

export const StyledContainer = styled(Box)`
  display: flex;
  flex-direction: column;
`

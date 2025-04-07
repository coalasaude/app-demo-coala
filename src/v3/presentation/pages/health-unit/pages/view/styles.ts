import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing(2)};
`

export const SwitchContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`

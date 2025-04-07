import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledContainer = styled(Box)`
  background-color: ${({ theme }) => theme.palette.grey[100]};
  padding: ${({ theme }) => theme.spacing(2)};
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  align-items: left;
  justify-content: center;
`

export default StyledContainer

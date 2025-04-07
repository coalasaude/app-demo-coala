import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const ContentWrapper = styled(Box)`
  padding: ${({ theme }) => theme.spacing(2)};
`

export default ContentWrapper

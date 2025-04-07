import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import { spacing } from '@/utils/spacing'

export const StyledPaperContent = styled(Box)`
  background-color: ${({ theme }) => theme.palette.background.default};
  padding: ${spacing(2)};
  display: flex;
  flex-direction: column;
  border-radius: 8px;
`

export default StyledPaperContent

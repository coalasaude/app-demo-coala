import { Box } from '@mui/material'
import styled from 'styled-components'

import { spacing } from '@/v3/presentation/utils/spacing'

export const Section = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${spacing(3)};
`

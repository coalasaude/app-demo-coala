import { Box } from '@mui/material'
import styled from 'styled-components'

import { spacing } from '@/v3/presentation/utils/spacing'

export const Container = styled(Box)``

export const CardGroup = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${spacing(2)};
`

import { Box } from '@mui/material'
import styled from 'styled-components'

import { spacing } from '@/utils/spacing'

export const Container = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${spacing(1)};
`

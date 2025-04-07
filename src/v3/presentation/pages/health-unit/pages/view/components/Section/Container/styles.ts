import { Box } from '@mui/material'
import styled from 'styled-components'

import { spacing } from '@/v3/presentation/utils/spacing'

export const Container = styled(Box)`
  & > *:not(:last-child) {
    margin-bottom: ${spacing(1)};
  }
`

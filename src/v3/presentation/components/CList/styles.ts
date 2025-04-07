import styled from 'styled-components'
import { Box } from '@mui/material'

import { spacing } from '../../utils/spacing'

export const Container = styled(Box)`
  > :not(:last-child) {
    margin-bottom: ${spacing(2)};
  }
`

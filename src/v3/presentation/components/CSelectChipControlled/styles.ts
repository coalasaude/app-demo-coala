import { Box } from '@mui/material'
import styled from 'styled-components'

import { spacing } from '../../utils/spacing'

export const ChipContainer = styled(Box)`
  display: flex;
  gap: ${spacing(1)};
  flex-wrap: wrap;
  margin-top: ${spacing(1)};
`

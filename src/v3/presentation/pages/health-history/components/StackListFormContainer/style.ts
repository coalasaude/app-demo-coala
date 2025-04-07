import styled from 'styled-components'
import { Box } from '@mui/material'

import { spacing } from '@/utils/spacing'

export const StyledContainerHeader = styled(Box)`
  display: flex;
  padding-top: ${spacing(2)};
  padding-bottom: ${spacing(3)};
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

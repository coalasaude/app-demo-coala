import { Box } from '@mui/material'
import styled from 'styled-components'

import { spacing } from '@/v3/presentation/utils/spacing'

export const Paper = styled(Box)`
  border-radius: 8px;
  border: 1px solid var(--gray_100);
  background: #fff;
  padding: ${spacing(2)};
  box-shadow: rgb(234, 236, 240) 0px 0px 1px, rgba(29, 41, 57, 0.08) 0px 1px 3px;
`

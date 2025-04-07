import { Button } from '@mui/material'
import styled from 'styled-components'

import { spacing } from '@/v3/presentation/utils/spacing'

export const StyledDeleteWrapper = styled(Button).attrs({ variant: 'text', color:'inherit' })`
  svg {
    margin-right: ${spacing(1)};
    width: 20px;
  }
`

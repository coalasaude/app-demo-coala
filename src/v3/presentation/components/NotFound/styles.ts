import styled from 'styled-components'
import { Box } from '@mui/material'

import { spacing } from '../../utils/spacing'

export const NotFoundContainer = styled(Box)`
  width: 100%;
  border: 2px solid var(--mui-palette-grey-300);
  border-radius: 8px;
  padding: ${spacing(1)};
  display: flex;
  align-items: center;
  justify-content: center;

  svg,
  span,
  p {
    color: var(--mui-palette-grey-700);
  }
`

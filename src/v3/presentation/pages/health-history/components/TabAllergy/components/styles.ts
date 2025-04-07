import styled from 'styled-components'
import { Box } from '@mui/material'

import { spacing } from '@/v3/presentation/utils/spacing'

export const DeniesAllergiesContainer = styled(Box)`
  width: 100%;
  border: 2px solid var(--mui-palette-grey-300);
  border-radius: 8px;
  padding: ${spacing(1)};
  display: flex;
  align-items: center;
  justify-content: left;

  svg,
  span,
  p {
    color: var(--mui-palette-black-700);
  }
`

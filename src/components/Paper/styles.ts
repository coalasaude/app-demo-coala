import styled from 'styled-components'
import { Box } from '@mui/material'

import { spacing } from '@/utils/spacing'

export const StyledCard = styled(Box)`
  background-color: white;
  min-height: 100px;
  width: 100%;
  padding: ${spacing(2)};
  padding-top: ${spacing(4)};
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 2px solid var(--mui-palette-grey-200);
`

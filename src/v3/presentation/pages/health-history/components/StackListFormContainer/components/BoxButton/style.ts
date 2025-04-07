import styled from 'styled-components'
import { Box } from '@mui/material'

import { spacing } from '@/utils/spacing'

export const StyledContainerItem = styled(Box)`
  display: flex;
  width: 100%;
  border: 2px solid var(--mui-palette-grey-200);
  padding: ${spacing(1)} ${spacing(2)};
  border-radius: ${spacing(1)};
  align-items: center;
  cursor: pointer;

  &:hover {
    border-color: var(--mui-palette-primary-main);
  }
`

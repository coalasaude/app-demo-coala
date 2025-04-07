import { Box } from '@mui/material'
import styled from 'styled-components'

import { spacing } from '@/v3/presentation/utils/spacing'

export const Container = styled(Box)`
  display: flex;
  flex-wrap: wrap;

  & > * {
    padding: ${spacing(1)} 0;
  }

  & > *:not(:last-child) {
    margin-right: ${spacing(4)};
  }
`

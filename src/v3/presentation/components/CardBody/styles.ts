import styled from 'styled-components'
import { Box } from '@mui/material'

export const CardBodyContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > * {
    flex: 1 !important;
  }
`

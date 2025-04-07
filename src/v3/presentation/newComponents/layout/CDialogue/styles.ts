import { Typography, Box, Button } from '@mui/material'
import styled from 'styled-components'

import { spacing } from '@/v3/presentation/utils/spacing'

export const StyledModalTitle = styled(Typography).attrs({ variant: 'h2' })`
  color: inherit !important;
`
export const StyledModalDescription = styled(Typography).attrs({ variant: 'body1' })``

export const StyledButton = styled(Button).attrs({ fullWidth: true, size: 'small' })`
  min-width: ${spacing(10)};
  max-width: ${spacing(14)};
`

export const StyledContainer = styled(Box)`
  display: flex;
  flex-direction: column;

  ${StyledModalTitle} {
    color: var(--mui-palette-primary-main);
    margin-bottom: ${spacing(2)};
  }

  ${StyledButton} {
    margin-top: ${spacing(2)};
  }
`

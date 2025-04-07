import styled from 'styled-components'
import { Typography } from '@mui/material'

import { spacing } from '../../utils/spacing'

export const StyledTitle = styled(Typography)<any>`
  height: fit-content;
`

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(2)};
`

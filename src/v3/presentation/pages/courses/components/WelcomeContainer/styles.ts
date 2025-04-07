import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'

import { Paper } from '@/v3/presentation/components/Paper'
import { spacing } from '@/v3/presentation/utils/spacing'

export const WelcomeContainerWrapper = styled(Paper)`
  padding: ${spacing(2)};
`

export const WelcomeContainerTitle = styled(Typography)`
  font-weight: 500;
  font-size: 1.125rem;
  margin-bottom: ${spacing(2)};
  color: var(--mui-palette-primary-main);
`

export const WelcomeContainerDescription = styled(Typography)`
  font-weight: 400;
  font-size: 0.875rem;
`

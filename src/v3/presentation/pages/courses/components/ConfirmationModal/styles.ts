import { Typography } from '@mui/material'
import styled from 'styled-components'

import Button from '@/v3/presentation/components/Button'
import { spacing } from '@/v3/presentation/utils/spacing'

export const StyledModalTitle = styled(Typography)`
  text-align: left;
`

export const StyledButton = styled(Button)``

export const StyledSubtitle = styled(Typography)`
  font-size: 14px;
  margin-top: ${spacing(2)};
  text-align: left;
`

export const StyledContainer = styled('div')<{ subtitle?: string }>`
  display: flex;
  flex-direction: column;

  ${StyledModalTitle} {
    color: var(--mui-palette-primary-main);
    font-size: 20px;
    font-weight: bold;
    margin-bottom: ${({ subtitle }) => (subtitle ? spacing(3) : 0)};
  }

  ${StyledSubtitle} {
    margin-bottom: ${({ subtitle }) => (subtitle ? spacing(3) : 0)};
  }

  ${StyledButton} {
    margin-top: ${spacing(2)};
  }
`

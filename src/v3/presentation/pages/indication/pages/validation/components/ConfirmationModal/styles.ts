import { Typography } from '@mui/material'
import styled from 'styled-components'

import { spacing } from '@/v3/presentation/utils/spacing'
import Button from '@/v3/presentation/components/Button'

export const StyledModalTitle = styled(Typography)``

export const StyledButton = styled(Button)``

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${StyledModalTitle} {
    color: var(--mui-palette-primary-main);
    font-size: 20px;
    font-weight: bold;
    margin-bottom: ${spacing(3)};
  }

  ${StyledButton} {
    margin-top: ${spacing(6)};
  }
`

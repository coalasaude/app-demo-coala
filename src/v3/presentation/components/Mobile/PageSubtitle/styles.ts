import { Typography } from '@mui/material'
import styled from 'styled-components'

import { breakpoint } from '@/utils/breakpoints'

export const PageSubtitleTypography = styled(Typography)`
  display: none;
  @media (max-width: ${breakpoint('sm')}) {
    margin-top: 8px;
    display: block;
  }
`

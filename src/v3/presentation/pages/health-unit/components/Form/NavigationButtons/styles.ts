import { Box } from '@mui/material'
import styled from 'styled-components'

import { CDivider } from '@/v3/presentation/newComponents'
import { spacing } from '@/v3/presentation/utils/spacing'
import { breakpoint } from '@/utils/breakpoints'

export const Container = styled(Box)`
  margin-top: ${spacing(2)};
  display: flex;
  justify-content: flex-end;
  gap: ${spacing(2)};

  @media (max-width: ${breakpoint('sm')}) {
    position: fixed;
    bottom: 75px;
    left: 0;
    padding: ${spacing(2)};
    width: 100%;
    z-index: 99;

    background: #fff;

    box-shadow:
      rgb(234, 236, 240) 0px 0px 1px,
      rgba(29, 41, 57, 0.08) 0px 1px 3px;

    & > button {
      width: 100%;
      border-radius: 8px;
    }
  }
`

export const StyledDivider = styled(CDivider)`
  padding-top: ${spacing(2)};
`

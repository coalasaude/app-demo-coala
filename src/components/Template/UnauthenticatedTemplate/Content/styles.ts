import styled from 'styled-components'

import { spacing } from '@/utils/spacing'
import { breakpoint } from '@/utils/breakpoints'

export const Content = styled.div`
  background: white;
  min-width: 540px;
  max-width: 540px;
  box-shadow: 0px 0px 8px 0px #0000001a;
  padding: ${spacing(2)};
  border-radius: 15px;
  z-index: 15;

  @media (max-width: ${breakpoint('sm')}) {
    min-width: 0;
    min-height: 0;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    border-radius: 0;
  }
`

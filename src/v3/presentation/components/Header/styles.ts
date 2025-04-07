import styled from 'styled-components'

import { spacing } from '@/utils/spacing'
import { breakpoint } from '@/utils/breakpoints'

export const HeaderWrapper = styled.header`
  background-color: transparent;
  min-height: 100px;
  width: 100%;
  padding: ${spacing(2)};
  padding-top: ${spacing(5)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`

export const StyledDesktopContainer = styled.header`
  display: none;
  @media (min-width: ${breakpoint('sm')}) {
    display: block;
  }
`

export const StyledHeaderWrapper = styled.div`
  width: 100%;
  ${HeaderWrapper} {
    @media (min-width: ${breakpoint('sm')}) {
      display: none;
    }
  }
`

export const StyledHeaderContent = styled.div`
  display: flex;
  justify-content: center;
  gap: ${spacing(2)};
  flex: 1;
  flex-wrap: wrap;
  flex-direction: column;
  position: relative;
`

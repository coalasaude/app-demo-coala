import styled from 'styled-components'

import { spacing } from '@/utils/spacing'

export const PageSpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1400;
  opacity: 1;
  background: #f3f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SpinnerContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  & > span {
    padding: ${spacing(1)};
    min-width: 50px !important;
    min-height: 50px !important;
    background: white;
    border-radius: 1000px;
    display: block;
  }
`

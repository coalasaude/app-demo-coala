import styled from 'styled-components'

import { spacing } from '@/utils/spacing'

export const HeaderWrapper = styled.header`
  background-color: white;
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

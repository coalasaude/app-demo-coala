import styled from 'styled-components'

import { spacing } from '../../utils/spacing'

export const StyledSquareButton = styled.button`
  align-items: center;
  background-color: transparent;
  border-radius: 8px;
  border: 1px solid var(--mui-palette-grey-400);
  cursor: pointer;
  display: block;
  display: flex;
  height: 24px;
  justify-content: center;
  padding: ${spacing(0.5)};
  width: 24px;

  & > svg {
    font-size: 12px;
    color: var(--mui-palette-grey-400);
  }
`

import styled from 'styled-components'

import { spacing } from '@/utils/spacing'

export const StyledDetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${spacing(2)};
  gap: ${spacing(0.5)};

  h1 {
    font-size: 16px;
  }

  p {
    font-size: 14px;
    color: var(--mui-palette-grey-700);
  }

  span {
    font-size: 16px;
    padding: 0 ${spacing(0.5)};
  }

  .subInfo {
    color: var(--mui-palette-grey-700);
  }
`

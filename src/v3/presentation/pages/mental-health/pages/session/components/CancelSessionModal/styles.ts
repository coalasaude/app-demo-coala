import styled from 'styled-components'

import { spacing } from '@/v3/presentation/utils/spacing'

export const StyledModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing(1)};
  padding: ${spacing(3)};
  background-color: var(--mui-palette-background-default);
  border-radius: ${spacing(2)};

  h1 {
    font-size: 18px;
  }
`

export const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: ${spacing(2)};
  padding: ${spacing(2)} ${spacing(3)} ${spacing(3)} ${spacing(3)};
`

export const StyledInputWrapper = styled.div`
  padding: 0 32px 16px 32px;
`

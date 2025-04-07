import styled from 'styled-components'

import { spacing } from '@/v3/presentation/utils/spacing'
import { CTextAreaControlled } from '@/v3/presentation/newComponents'

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(2)};
  padding: ${spacing(3)} ${spacing(2)};
  h1 {
    font-weight: 700;
    font-size: 16px;
  }

  h2 {
    font-weight: 400;
    font-size: 16px;
  }
`

export const StyledSwitchWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const StyledButtonsWrapper = styled.div`
  position: absolute;
  bottom: 80px;
  background-color: white;
  width: 100%;
  left: 0;
  justify-content: center;
  padding: ${spacing(2)};
  display: flex;
  gap: ${spacing(2)};

  @media (min-width: 768px) {
    position: unset;
    justify-content: flex-end;
  }
`

export const StyledCTextAreaControlled = styled(CTextAreaControlled)`
  max-width: 500px;
  .MuiOutlinedInput-root {
    border-radius: 4px;
  }
`

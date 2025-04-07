import styled from 'styled-components'

import { spacing } from '@/utils/spacing'

export const StyledSessionInfo = styled.div`
  display: flex;
  flex: 1;
  gap: ${spacing(2)};
  margin: ${spacing(2)} 0 ${spacing(2)} 0;
`
export const StyledCalendarInfo = styled.div`
  display: flex;
  flex: 1;

  svg {
    color: var(--mui-palette-grey-700);
  }
`

export const StyledCalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(0.5)};
  margin-left: ${spacing(1)};

  span {
    font-size: 12px;
    font-weight: 400;
  }
`

export const StyledProfessionalInfo = styled.div`
  display: flex;
  flex: 1;

  svg {
    color: var(--mui-palette-grey-700);
  }
`

export const StyledProfessionalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(0.5)};
  margin-left: ${spacing(1)};

  span {
    font-size: 12px;
    font-weight: 400;
  }

  .name {
    font-weight: bold;
  }
`

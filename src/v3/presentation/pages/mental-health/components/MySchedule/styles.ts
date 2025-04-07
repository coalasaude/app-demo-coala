import styled from 'styled-components'

import Paper from '@/v3/presentation/components/Paper'
import { spacing } from '@/utils/spacing'

export const StyledMyScheduleWrapper = styled(Paper)`
  width: 95%;
  margin: ${spacing(2)} auto 0 auto;

  @media (min-width: 800px) {
    width: 100%;
  }
`

export const StyledMyScheduleTitle = styled.h1`
  color: #6f46be;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: ${spacing(3)};
`

export const StyledCardListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(3)};
`

export const StyledButtonWrapper = styled.div`
  margin-top: ${spacing(5)};
  display: flex;
  flex-direction: column;
  gap: ${spacing(2)};

  @media (min-width: 800px) {
    flex-direction: row-reverse;
    justify-content: flex-start;
    width: ${spacing(48)};
    gap: ${spacing(4)};
  }
`

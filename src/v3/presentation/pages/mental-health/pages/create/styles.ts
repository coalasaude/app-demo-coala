import styled from 'styled-components'
import { Divider } from '@mui/material'

import Paper from '@/v3/presentation/components/Paper'
import { spacing } from '@/utils/spacing'

export const StyledMyScheduleWrapper = styled(Paper)`
  margin-right: 0;

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

export const StyledStudentInfoWrapper = styled.div`
  margin-top: ${spacing(4)};
  display: flex;
  flex-direction: column;
  gap: ${spacing(3)};

  @media (min-width: 800px) {
    flex-direction: row;
    margin-bottom: ${spacing(3)};
  }
`

export const StyledDivider = styled(Divider)`
  height: 2px;
  background-color: #e0e0e0;
`

export const StyledScheduleListTitle = styled.div`
  flex-direction: column;
  display: flex;

  span {
    font-size: 14px;
    color: var(--mui-palette-grey-700);
    font-weight: 500;
  }

  h1 {
    font-size: 16px;
    font-weight: 600;
  }
`

export const StyledParticipantsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(3)};
  margin-top: ${spacing(4)};
`

export const StyledInfoSession = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(3)};
  margin-top: ${spacing(4)};
  margin-bottom: ${spacing(7)};

  @media (min-width: 800px) {
    flex-direction: row;
    align-items: center;
  }
`

export const StyledSwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${spacing(1)};
`

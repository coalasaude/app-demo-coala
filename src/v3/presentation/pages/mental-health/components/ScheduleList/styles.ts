import styled from 'styled-components'

import { spacing } from '@/utils/spacing'

export const StyledScheduleListWrapper = styled.div`
  padding: ${spacing(5)} ${spacing(2)};

  @media (min-width: 800px) {
    padding: ${spacing(5)} 0;
  }
`

export const StyledScheduleListHeader = styled.div`
  display: flex;
  justify-content: space-between;
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

export const StyledScheduleListFilter = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: ${spacing(4)};
`

export const StyledSelectWrapper = styled.div`
  width: 130px;
`

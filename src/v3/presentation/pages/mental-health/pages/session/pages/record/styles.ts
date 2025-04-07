import styled from 'styled-components'

import { Paper } from '@/v3/presentation/components/Paper'
import { spacing } from '@/v3/presentation/utils/spacing'

export const StyledRecordWrapper = styled(Paper)`
  padding: ${spacing(1)};
  width: 100%;
`

export const StyledRecordInfoContainer = styled.div`
  margin: ${spacing(2)} ${spacing(1)};
  display: flex;
  flex-direction: column;
  gap: ${spacing(2)};
  h1 {
    font-size: 16px;
    font-weight: 700;
  }
`

export const StyledRecordDateInfoContainer = styled.div`
  display: flex;
  gap: ${spacing(1)};
`

export const StyledRecordInfoFormWrapper = styled.div`
  display: flex;
  gap: ${spacing(2)};
  flex-direction: column;
  max-width: 424px;
`

export const StyledRecordInfo = styled.div`
  font-size: 16px;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  gap: ${spacing(0.5)};
  flex: 1;

  .subTitle {
    color: var(--mui-palette-grey-700);
    font-size: 14px;
  }
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
    flex: 1;
  }
`

export const StyleDownloadButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${spacing(0.4)};
  color: var(--mui-palette-primary-main);
  font-size: 14px;
  cursor: pointer;
  margin-top: ${spacing(3)};
`

export const StyledWrapperFooterButtons = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media (min-width: 768px) {
    justify-content: center;
  }
`

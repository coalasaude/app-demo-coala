import styled, { css } from 'styled-components'
import { Typography } from '@mui/material'

import { spacing } from '../../utils/spacing'
import { CCardBase } from '../../newComponents'

export const StyledDiagnoseCard = styled(CCardBase)`
  padding: 8px;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 100%;
  border-width: 2px;
  box-shadow: none;
`

export const StyledDiagnoseCardHeader = styled.div`
  border-bottom: 2px dashed var(--mui-palette-grey-400);
  display: flex;
  gap: ${spacing(1)};
  margin-bottom: ${spacing(1)};
  padding: ${spacing(0.5)};
`

export const StyledDiagnoseCardHeaderLabel = styled(Typography)``

export const StyledDiagnoseCardHeaderTitle = styled(Typography)``

export const labelStyle = css`
  color: var(--mui-palette-grey-400);
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`

export const StyledDiagnoseCardHeaderTitleContainer = styled.div`
  padding-bottom: ${spacing(1)};

  ${StyledDiagnoseCardHeaderLabel} {
    ${labelStyle}
  }

  ${StyledDiagnoseCardHeaderTitle} {
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
  }
`

export const StyledDiagnoseCardHeaderActions = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  padding-bottom: ${spacing(1)};
`
export const StyledDiagnoseCardHeaderStatus = styled(Typography)``

export const StyledDiagnoseCardHeaderStatusContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  padding-bottom: ${spacing(1)};

  ${StyledDiagnoseCardHeaderStatus} {
    align-items: center;
    color: var(--mui-palette-error-main);
    display: flex;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;

    svg {
      color: var(--mui-palette-error-main);
      font-size: 12px;
      margin-left: ${spacing(0.5)};
    }
  }
`

export const StyledDiagnoseCardContentWrapper = styled.div`
  display: flex;
  gap: ${spacing(2)};
`

export const StyledDiagnoseCardContentLabel = styled(Typography)``
export const StyledDiagnoseCardContentText = styled(Typography)``

export const StyledDiagnoseCardContentContainer = styled.div`
  flex: 1;

  ${StyledDiagnoseCardContentLabel} {
    ${labelStyle}
  }

  ${StyledDiagnoseCardContentText} {
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
  }
`

import styled, { css } from 'styled-components'
import { Typography } from '@mui/material'

import { Paper } from '@/v3/presentation/components/Paper'
import { spacing } from '@/v3/presentation/utils/spacing'

export const StyledSessionPageWrapper = styled.div`
  display: flex;
  padding: ${spacing(1)};
  flex-direction: column;
  gap: ${spacing(2)};
  width: 100%;
`

export const StyledInfoCard = styled(Paper)`
  padding: ${spacing(1)};
  width: 100%;
`

export const StyledTabsWrapper = styled.div`
  display: flex;
  border-bottom: 2px solid #e1e5e9;
  gap: ${spacing(3)};
`

export const StyledTabText = styled(Typography)<{ isActive?: boolean }>`
  font-size: 15px !important;
  padding: ${spacing(1)};
  &:hover {
    cursor: pointer;
  }
  ${(props) =>
    props.isActive
      ? css`
          font-weight: 700 !important;
          border-bottom: 2px solid #6f46be;
        `
      : css`
          font-weight: 400 !important;
          color: var(--mui-palette-grey-700);
        `}
`

export const StyledSection = styled(Paper)`
  display: flex;
  flex-direction: column;
  gap: ${spacing(1)};
`

export const TableTitle = styled.div`
  display: flex;
  padding: ${spacing(1)};
  justify-content: space-between;

  h1 {
    font-size: 16px;
  }
`

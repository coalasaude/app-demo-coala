import { styled } from '@mui/material/styles'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

import { spacing } from '@/v3/presentation/utils/spacing'

export const StyledWrapperTimer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-size: 14px;
  color: var(--mui-palette-grey-700);
  gap: 8px;
`

export const StyledWrapperTitles = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const StyledAccessTimeIcon = styled(AccessTimeIcon)`
  width: 16px !important;
  height: 16px !important;
  color: var(--mui-palette-grey-700);
`

export const StyledFinalTestHeader = styled('div')`
  padding: ${spacing(1)};
  display: flex;
  justify-content: space-between;

  h2 {
    font-size: 12px;
    margin-bottom: ${spacing(1)};
    color: var(--mui-palette-grey-700);
  }
  h1 {
    font-size: 18px;
  }
`

import { styled } from '@mui/material/styles'

import { spacing } from '@/v3/presentation/utils/spacing'

export const StyledMobilePlayerController = styled('div')`
  width: 100%;
  background-color: #f3f5f7;
  padding: ${spacing(1)};
  margin: ${spacing(2)};
  display: flex;
  gap: ${spacing(2)};
  justify-content: space-between;
  border-radius: 6px;
`

export const StyledMobilePlayerControllerButton = styled('div')`
  color: #6f46be;
  display: flex;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
`

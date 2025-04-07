import styled from 'styled-components'
import CircleIcon from '@mui/icons-material/Circle'

import Paper from '@/v3/presentation/components/Paper'
import { spacing } from '@/utils/spacing'

export const StyledScheduleCardWrapper = styled(Paper)`
  padding: ${spacing(1.5)} ${spacing(2)};
  width: 100%;
  cursor: pointer;
  min-height: 160px;
  height: 100%;
  display: flex;
  flex-direction: column;
`
export const StyledScheduleCardHeader = styled.div`
  display: flex;
  font-size: 10px;
  font-weight: 400;
  justify-content: space-between;
  height: ${spacing(2)};
`

export const StyledScheduleCardWrapperStatus = styled.div`
  align-items: center;
  display: flex;
`

export const StyledScheduleCardTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
`

export const StyledWrapperInfo = styled.div`
  display: flex;
  gap: 30%;
  margin-top: ${spacing(2)};
`

export const StyledScheduleCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const StyledScheduleCardFooter = styled.div`
  color: #737373;
  display: flex;
  font-size: 12px;
  font-weight: 500;
  justify-content: space-between;
  margin-top: auto;
  background-color: #fafafa;
  padding: ${spacing(0.5)} ${spacing(1)};
  border-radius: 50px;
  width: 100%;
`

export const StyledStatusCircle = styled(CircleIcon)<{ $statusColor: string }>`
  margin-left: 8px;
  color: ${({ $statusColor }) => $statusColor} !important;
  width: 10px !important;
`

export const StyledTitleInfo = styled.span`
  font-size: 10px;
  font-weight: 400;
`

export const StyledInfo = styled.span`
  font-size: 12px;
  font-weight: 600;
`

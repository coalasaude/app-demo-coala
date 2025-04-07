import styled from 'styled-components'

import { spacing } from '@/utils/spacing'
import { CInputControlled } from '@/v3/presentation/newComponents'

export const StyledContentCardScheduleWrapper = styled.div<{ expanded: boolean }>`
  width: 100%;
  min-height: ${(props) => (props.expanded ? 'auto' : spacing(8))};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 ${spacing(2)};
  overflow: hidden;
  background-color: #f3f5f7;
  color: ${(props) => (props.expanded ? '#2B323B' : 'var(--mui-palette-grey-700)')};
  border-radius: 8px;

  ${({ expanded }) => expanded && `padding: ${spacing(2)};`}
`

export const StyledHeaderContentCardSchedule = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const StyledInputRowContentCardSchedule = styled.div`
  display: flex;
  align-items: center;
  margin: ${spacing(3)} ${spacing(2)};
  gap: 20px;
`

export const StyledTextField = styled(CInputControlled)`
  width: 130px !important;
  height: 40px;
`

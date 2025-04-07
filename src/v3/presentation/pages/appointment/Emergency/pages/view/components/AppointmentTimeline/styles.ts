import { Timeline, TimelineItem } from '@mui/lab'
import styled from 'styled-components'

import { spacing } from '@/utils/spacing'

export const StyleTimeline = styled(Timeline)`
  align-items: flex-start;
`

export const StyleTimelineItem = styled(TimelineItem)`
  width: min-content;
  margin-left: -${spacing(5)};

  &:last-child::after {
    display: none;
  }
`

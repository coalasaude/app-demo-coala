import { Typography } from '@mui/material'

import { formatDate } from '@/utils/formatDate'
import { spacing } from '@/utils/spacing'

import {
  StyledTimelineConnector,
  StyledTimelineContent,
  CTimelineDateText,
  CTimelineDot,
  StyledTimelineItem,
  StyledTimelineSeparator,
} from './styles'

type CTimelineProps = {
  isFinishedOrLast?: boolean
  isLast?: boolean
  name?: string
  date?: Date
  dateFormat?: string
}

export const CTimeline = ({ isFinishedOrLast, isLast, name, date, dateFormat }: CTimelineProps) => {
  return (
    <StyledTimelineItem>
      <StyledTimelineSeparator>
        <CTimelineDot isFinished={isFinishedOrLast} />
        <StyledTimelineConnector last={isLast} />
      </StyledTimelineSeparator>
      <StyledTimelineContent mt={-1} minWidth='max-content'>
        <Typography
          color='var(--mui-palette-grey-600)'
          width='max-content'
          variant='h5'
          mb={spacing(-0.5)}
        >
          {name}
        </Typography>
        <CTimelineDateText>{date ? formatDate(String(date), dateFormat) : '-'}</CTimelineDateText>
      </StyledTimelineContent>
    </StyledTimelineItem>
  )
}

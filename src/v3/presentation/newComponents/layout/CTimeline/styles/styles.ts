import { TimelineItem, Timeline, TimelineContent, TimelineSeparator } from '@mui/lab'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledTimelineDotContainer = styled(Box)<{ isFinished?: boolean }>`
  width: ${({ theme }) => theme.spacing(4)};
  height: ${({ theme }) => theme.spacing(4)};
  border: 2px solid var(--mui-palette-grey-400);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--mui-palette-grey-400);
  border-color: var(--mui-palette-grey-400);

  ${({ isFinished }) =>
    isFinished &&
    `
    background: var(--mui-palette-primary-main);
    border-color: var(--mui-palette-primary-main);
  `}
`

export const StyledTimelineConnector = styled(Box)<{ last?: boolean }>`
  margin-top: ${({ theme }) => theme.spacing(1)};
  width: ${({ theme }) => theme.spacing(0.5)};
  flex-grow: 0.7;
  background: var(--mui-palette-grey-400);

  ${({ last }) =>
    last &&
    `
    background: var(--mui-palette-primary-light);
    display: none;
  `}
`

export const StyledTimelineItem = styled(TimelineItem)`
  width: min-content;
  margin-left: ${({ theme }) => theme.spacing(-5)};

  &:last-child::after {
    display: none;
  }
`

export const StyledTimelineWrapper = styled(Timeline)`
  align-items: flex-start;
`

export const StyledTimelineContent = styled(TimelineContent)``

export const StyledTimelineSeparator = styled(TimelineSeparator)``

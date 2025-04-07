import type { Meta, StoryObj } from '@storybook/react'

import { CTimeline } from './index'

const meta: Meta<typeof CTimeline> = {
  title: 'layout/CTimeline',
  component: CTimeline,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The `CTimeline` component displays a timeline with customizable events.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isFinishedOrLast: {
      control: 'boolean',
      description: 'Indicates if the timeline event is finished or the last event',
    },
    isLast: {
      control: 'boolean',
      description: 'Indicates if the timeline event is the last event',
    },
    name: { control: 'text', description: 'The name of the event' },
    date: { control: 'date', description: 'The date of the event' },
    dateFormat: { control: 'text', description: 'The format of the date to be displayed' },
  },
}

export default meta

type CTimelineStory = StoryObj<typeof CTimeline>

export const Default: CTimelineStory = {
  args: {
    name: 'Event 1',
    date: new Date(),
  },
}

export const LastEvent: CTimelineStory = {
  args: {
    name: 'Last Event',
    date: new Date(),
    isLast: true,
  },
}

export const FinishedEvent: CTimelineStory = {
  args: {
    name: 'Finished Event',
    date: new Date(),
    isLast: true,
    isFinishedOrLast: true,
  },
}

export const FinishedButNotLastEvent: CTimelineStory = {
  args: {
    name: 'Finished Event',
    date: new Date(),
    isFinishedOrLast: true,
  },
}

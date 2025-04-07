import type { Meta, StoryObj } from '@storybook/react'

import { CVideoCallAttendants } from './index'

const meta: Meta<typeof CVideoCallAttendants> = {
  title: 'layout/CVideoCallAttendants',
  component: CVideoCallAttendants,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The `CVideoCallAttendants` component displays attendants for a video call.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    user: {
      defaultValue: 'Outro',
    },
  },
}

export default meta

type CVideoCallAttendantsStory = StoryObj<typeof CVideoCallAttendants>

export const Default: CVideoCallAttendantsStory = {
  args: {
    user: {
      fullName: 'Dr. House',
      id: 1,
    },
  },
}

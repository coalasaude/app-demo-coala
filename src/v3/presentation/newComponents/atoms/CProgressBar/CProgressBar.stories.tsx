import type { Meta, StoryObj } from '@storybook/react'

import { CProgressBar } from './index'

const meta: Meta<typeof CProgressBar> = {
  title: 'Atoms/CProgressBar',
  component: CProgressBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `CProgressBar` component provides a customizable way to display progress bars. It builds upon the Material UI LinearProgress component, offering control over state and value.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: { type: 'select', options: ['default', 'low', 'medium', 'great'] },
      description: 'Visual state of the progress bar',
    },
    value: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'The value of the progress bar, between 0 and 100',
    },
  },
}

export default meta

type CProgressBarStory = StoryObj<typeof CProgressBar>

export const Default: CProgressBarStory = {
  args: {
    state: 'default',
    value: 50,
    sx: { width: '200px' },
  },
}

export const Low: CProgressBarStory = {
  args: {
    state: 'low',
    value: 25,
    sx: { width: '200px' },
  },
}

export const Medium: CProgressBarStory = {
  args: {
    state: 'medium',
    value: 60,
    sx: { width: '200px' },
  },
}

export const Great: CProgressBarStory = {
  args: {
    state: 'great',
    value: 90,
    sx: { width: '200px' },
  },
}

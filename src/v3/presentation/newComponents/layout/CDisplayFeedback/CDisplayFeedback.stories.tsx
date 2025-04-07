import type { Meta, StoryObj } from '@storybook/react'

import WithoutRecords from 'public/assets/svg/AppointmentsView/WithoutRecords.svg'

import { CDisplayFeedback } from './CDisplayFeedback'

const meta: Meta<typeof CDisplayFeedback> = {
  title: 'Layout/CDisplayFeedback',
  component: CDisplayFeedback,
  parameters: {
    docs: {
      description: {
        component:
          'The `CDisplayFeedback` component is a layout component that displays a title, subtitle, a button and children components. It is used to display feedback messages to the user.',
      },
    },
  },
  argTypes: {
    title: {
      description: 'The title of the feedback message',
      control: 'text',
    },
    subtitle: {
      description: 'The subtitle of the feedback message',
      control: 'text',
    },
    children: {
      description: 'The children components to be displayed side by side with the feedback message',
      control: 'text',
    },
    buttonProps: {
      description: 'The props for the button displayed under the subtitle',
      control: 'object',
    },
    align: {
      description: 'The alignment of the feedback message',
      control: {
        type: 'select',
        options: ['center', 'left', 'right'],
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CDisplayFeedback>

export const Default: Story = {
  args: {
    title: 'Feedback Title',
    subtitle: 'Subtitle',
    children: 'Content of the feedback goes here (Children)',
  },
}

export const WithButton: Story = {
  args: {
    title: 'Feedback Title',
    subtitle: 'Subtitle',
    children: 'Content of the feedback goes here (Children)',
    buttonProps: {
      children: 'Button',
      onClick: () => alert('Button clicked'),
    },
  },
}

export const WithoutChildren: Story = {
  args: {
    title: 'Feedback Title',
    subtitle: 'Subtitle',
  },
}

export const WithSVG: Story = {
  args: {
    title: 'Feedback Title',
    subtitle: 'Subtitle',
    children: <WithoutRecords />,
  },
}

export const WithCenterAlignment: Story = {
  args: {
    title: 'Feedback Title',
    subtitle: 'Subtitle',
    children: 'Content of the feedback goes here (Children)',
    align: 'center',
  },
}

export const WithoutSubtitle: Story = {
  args: {
    title: 'Feedback Title',
    children: 'Content of the feedback goes here (Children)',
  },
}

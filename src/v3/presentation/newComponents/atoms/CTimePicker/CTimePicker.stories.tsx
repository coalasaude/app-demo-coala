import { Meta, StoryObj } from '@storybook/react'
import dayjs from 'dayjs'

import { CTimePicker } from './CTimePicker'

const meta: Meta<typeof CTimePicker> = {
  title: 'atoms/CTimePicker',
  component: CTimePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `CTimePicker` component is a customizable time picker. It allows users to select a time value. Customize its appearance and behavior by adjusting the props.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
    error: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CTimePicker>

export const Default: Story = {
  args: {
    label: 'Select Time',
  },
}

export const WithDefaultValue: Story = {
  args: {
    label: 'Select Time',
    value: dayjs('10:30'),
  },
}

export const Disabled: Story = {
  args: {
    label: 'Select Time',
    disabled: true,
  },
}

export const Error: Story = {
  args: {
    label: 'Select Time',
    error: 'This is an error',
  },
}

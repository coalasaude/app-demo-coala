import type { Meta, StoryObj } from '@storybook/react'
import dayjs from 'dayjs'

import { CDatePicker } from './CDatePicker'

const meta: Meta<typeof CDatePicker> = {
  title: 'atoms/CDatePicker',
  component: CDatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `CDatePicker` component is a customized date picker built using the `@mui/x-date-pickers` library. It provides a user-friendly interface for selecting dates, with support for localization and customizable props.\n\n### Features:\n\n- **Date Selection**: Allows users to select a date using a calendar-style interface.\n\n- **Localization**: Supports localization of date format and text using the `dayjs` library and the `localeText` prop.\n\n- **Customizable Props**: Accepts various props from the `@mui/x-date-pickers` library to customize the behavior and appearance of the date picker.\n\n- **Error Handling**: Displays error messages when the `error` prop is provided.\n\n### Example Usage:\n\nThe `CDatePicker` component is ideal for scenarios where users need to input dates, such as form fields, search filters, or any other date-related functionality. It provides a consistent and intuitive interface for date selection, ensuring a smooth user experience.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'The label for the date picker.',
      control: 'text',
    },
    value: {
      description: 'The selected date value.',
      control: 'date',
    },
    error: {
      description: 'The error message to display.',
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<typeof CDatePicker>

export const Default: Story = {
  args: {
    label: 'Select a date',
    value: dayjs(),
    error: '',
  },
}

export const WithError: Story = {
  args: {
    label: 'Select a date',
    value: dayjs(),
    error: 'Please select a valid date.',
  },
}

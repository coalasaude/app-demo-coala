import type { Meta, StoryObj } from '@storybook/react'

import { CDisplayRecord, CDisplayRecordProps } from './index'

const meta: Meta<CDisplayRecordProps> = {
  title: 'Molecules/CDisplayRecord',
  component: CDisplayRecord,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A component for displaying a record with a label and a value.',
      },
    },
  },
  argTypes: {
    label: {
      description: 'The label for the record.',
      control: 'text',
    },
    value: {
      description: 'The value of the record.',
      control: 'text',
    },
    withDivider: {
      description: 'Whether to display a divider below the record.',
      control: 'boolean',
    },
    onClick: {
      description: 'The function to call when the record is clicked.',
      action: 'clicked',
    },
    clickable: {
      description: 'Whether the record is clickable.',
      control: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<CDisplayRecordProps>

export const Default: Story = {
  args: {
    label: 'Name',
    value: 'John Doe',
    onClick: undefined,
  },
}

export const WithoutDivider: Story = {
  args: {
    label: 'Email',
    value: 'john.doe@example.com',
    withDivider: false,
    onClick: undefined,
  },
}

export const EmptyValue: Story = {
  args: {
    label: 'Phone',
    value: '',
    onClick: undefined,
  },
}

export const NullValue: Story = {
  args: {
    label: 'Id',
    value: null,
    onClick: undefined,
  },
}

export const Clickable: Story = {
  args: {
    label: 'Click',
    value: 'Click me',
    onClick: () => alert('Clicked'),
  },
}

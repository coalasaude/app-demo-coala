import type { Meta, StoryObj } from '@storybook/react'

import { CSwitch } from './CSwitch'

const meta: Meta<typeof CSwitch> = {
  title: 'Components/CSwitch',
  component: CSwitch,
  parameters: {
    docs: {
      description: {
        component: 'A customizable switch component based on Material-UI Switch.',
      },
    },
  },
  argTypes: {
    checked: {
      description: 'If true, the component is checked.',
      control: 'boolean',
      defaultValue: false,
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      description: 'If true, the component is disabled.',
      control: 'boolean',
      defaultValue: false,
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onChange: {
      description: 'Callback fired when the state is changed.',
      control: 'function',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CSwitch>

export const Default: Story = {
  args: {},
}

export const Checked: Story = {
  args: {
    checked: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const WithOnChange: Story = {
  args: {
    onChange: () => {
      alert('Switch state change:')
    },
  },
}

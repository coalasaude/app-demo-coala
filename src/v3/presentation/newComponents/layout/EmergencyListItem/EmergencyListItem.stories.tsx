import type { Meta, StoryObj } from '@storybook/react'

import EmergencyListItem from './EmergencyListItem'

const meta: Meta<typeof EmergencyListItem> = {
  title: 'Layout/EmergencyButton',
  component: EmergencyListItem,
  parameters: {
    docs: {
      description: {
        component: 'Emergency ListItem that changes appearance based on the sidebar state.',
      },
    },
  },
  argTypes: {
    isOpen: {
      description: 'Indicates whether the sidebar is open, affecting the button display.',
      control: 'boolean',
      defaultValue: true,
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EmergencyListItem>

export const OpenSidebar: Story = {
  args: {
    isOpen: true,
  },
}

export const ClosedSidebar: Story = {
  args: {
    isOpen: false,
  },
}

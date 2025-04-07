import type { Meta, StoryObj } from '@storybook/react'

import { CNavbar } from './CNavbar'

const meta: Meta<typeof CNavbar> = {
  title: 'Layout/CNavbar',
  component: CNavbar,
  parameters: {
    docs: {
      description: {
        component: 'A navigation bar component with customizable items and actions.',
      },
    },
  },
  argTypes: {
    toggleSidebar: {
      description: 'Function to toggle the sidebar',
      control: 'function',
    },
    isOpenedSidebar: {
      description: 'Indicates whether the sidebar is currently open',
      control: 'boolean',
      defaultValue: false,
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CNavbar>

export const Default: Story = {
  args: {
    isOpenedSidebar: false,
  },
}

export const WithOpenSidebar: Story = {
  args: {
    isOpenedSidebar: true,
  },
}

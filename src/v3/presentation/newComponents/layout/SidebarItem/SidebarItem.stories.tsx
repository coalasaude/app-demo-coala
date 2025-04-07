import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import StarBorderIcon from '@mui/icons-material/StarBorder'

import SideBarItem, { TSidebarItemProps } from './SidebarItem'

const meta: Meta<TSidebarItemProps> = {
  title: 'Layout/SideBarItem',
  component: SideBarItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'This component represents an item in a sidebar, including an icon, text, and various interactive properties. Its designed for use in navigation menus within a responsive layout, especially catering to different device sizes.',
      },
    },
  },
  argTypes: {
    isOpen: {
      description:
        'Determines if the sidebar is open or closed, impacting how the item is displayed.',
      control: 'boolean',
      defaultValue: true,
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    isActive: {
      description:
        'Indicates whether the item is currently active, changing its visual appearance to signify selection.',
      control: 'boolean',
      defaultValue: false,
    },
    Icon: {
      description:
        'The icon displayed in the sidebar item. Can be any ReactNode, typically an MUI icon.',
      defaultValue: <StarBorderIcon />,
      control: 'object',
    },
    text: {
      description: 'The text label displayed next to the icon in the sidebar item.',
      control: 'text',
      defaultValue: 'Example Item',
    },
    itemColor: {
      description:
        'Custom color for the item, allowing for visual customization according to the theme or user preference. USE COLORS NAME FROM CSS VARS',
      control: 'color',
    },
    isSmallDevice: {
      description:
        'Indicates if the sidebar is being used on a small device. This can alter the behavior of the item, such as closing the sidebar on click.',
      control: 'boolean',
    },
    toggleSidebar: {
      description:
        'Function to toggle the sidebar, typically used on small devices to close the sidebar upon item selection.',
      action: 'toggleSidebar',
    },
    onClick: {
      description:
        'Function to handle the click event on the sidebar item. It can be used to navigate or trigger specific actions in the application.',
      action: 'onClick',
    },
    isNew: {
      description:
        'Indicates if the item is new, allowing for visual differentiation in the sidebar.',
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<TSidebarItemProps>

export const Default: Story = {
  args: {
    isOpen: true,
    Icon: <StarBorderIcon />,
    text: 'Example Item',
    isActive: false,
    onClick: () => {
      alert('clicked')
    },
  },
}

export const ActiveItem: Story = {
  args: {
    ...Default.args,
    isActive: true,
    itemColor: 'var(--mui-palette-primary-main)',
  },
}

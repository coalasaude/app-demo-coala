import type { Meta, StoryObj } from '@storybook/react'
import { Home } from '@mui/icons-material'

import CNavbarItem from './'

const meta: Meta<typeof CNavbarItem> = {
  title: 'molecules/CNavbarItem',
  component: CNavbarItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '`CNavbarItem` is a component that represents an item in the mobile navigation bar. It displays an icon and text, and can be clicked to navigate to a specific route. The component also supports an active state to indicate the currently selected item.\n\n- **Customization**: Allows customization of the icon, text, and click behavior through props.\n\n- **Active State**: Supports an active state to highlight the currently selected item.\n\n- **Responsive**: Adjusts the layout and styling for optimal display on mobile devices.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      description: 'The text to display below the icon.',
      control: 'text',
    },
    Icon: {
      description: 'The icon component to display.',
      control: false,
    },
    IconProps: {
      description: 'Additional props to pass to the icon component.',
      control: false,
    },
    onClick: {
      description: 'Function called when the navbar item is clicked.',
      action: 'onClick',
    },
    isActive: {
      description: 'Indicates whether the navbar item is currently active.',
      control: 'boolean',
    },
  },
}

export default meta

type CNavbarItemStory = StoryObj<typeof CNavbarItem>

export const Default: CNavbarItemStory = {
  args: {
    text: 'Home',
    Icon: Home,
    onClick: () => alert('Navbar Item Clicked'),
    isActive: false,
  },
}

export const Active: CNavbarItemStory = {
  args: {
    text: 'Home',
    Icon: Home,
    onClick: () => alert('Navbar Item Clicked'),
    isActive: true,
  },
}

import type { Meta, StoryObj } from '@storybook/react'
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'

import { CSidebarItemList } from './CSidebarItemList'

const mockAuthState = {
  selectedInstitution: '123',
  user: {
    UserProfile: [
      {
        institution_id: '123',
        institution: {
          network_id: 'network123',
        },
      },
    ],
  },
}

const meta: Meta<typeof CSidebarItemList> = {
  title: 'Layout/CSidebarItemList',
  component: CSidebarItemList,
  parameters: {
    docs: {
      description: {
        component:
          'Manages the rendering of sidebar items based on permissions, active state, and provides an interactive way to handle item clicks.',
      },
    },
  },
  argTypes: {
    sidebarItems: {
      description: 'Array of sidebar items to be rendered.',
      control: 'object',
    },
    isOpen: {
      description: 'Controls if the sidebar is open or closed.',
      control: 'boolean',
    },
    handleItemClick: {
      description: 'Function to handle the click event on a sidebar item.',
      action: 'clicked',
    },
    toggleSidebar: {
      description: 'Function to toggle the sidebar open/close state.',
      action: 'toggled',
    },
    isSmallDevice: {
      description: 'Indicates if the component is being viewed on a small device.',
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
}

export default meta

const Template: StoryObj<typeof CSidebarItemList> = {
  args: {
    sidebarItems: [
      {
        name: 'Home',
        route: () => '/home',
        icon: HomeIcon,
        hasPermission: () => true,
      },
      {
        name: 'Settings',
        route: () => '/settings',
        icon: SettingsIcon,
        hasPermission: () => true,
      },
    ],
    isOpen: true,
    handleItemClick: () => () => window.alert('Item clicked'),
    toggleSidebar: () => window.alert('Sidebar toggled'),
    isSmallDevice: false,
    auth: mockAuthState as any,
  },
}

export const Default: typeof Template = {
  ...Template,
  args: {
    ...Template.args,
  },
}

export const Collapsed: typeof Template = {
  ...Template,
  args: {
    ...Template.args,
    isOpen: false,
  },
}

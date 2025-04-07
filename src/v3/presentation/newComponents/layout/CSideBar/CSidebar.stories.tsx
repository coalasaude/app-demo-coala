import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { AddToQueue } from '@mui/icons-material'

import CSideBar, { CSideBarProps } from './CSidebar'

const mockSidebarItems = [
  {
    name: 'Item 1',
    route: () => '/item-1',
    icon: AddToQueue,
    isActive: () => true,
    hasPermission: () => true,
  },
  {
    name: 'Item 2',
    route: () => '/item-1',
    icon: AddToQueue,
    hasPermission: () => true,
  },
  {
    name: 'Item 3',
    route: () => '/item-1',
    icon: AddToQueue,
    hasPermission: () => true,
  },
  {
    name: 'Item 4',
    route: () => '/item-1',
    icon: AddToQueue,
    hasPermission: () => true,
  },
]

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

const meta: Meta<CSideBarProps> = {
  title: 'Layout/CSideBar',
  component: CSideBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'CSideBar is a customizable sidebar component that adapts to different screen sizes. It incorporates a responsive design and is composed of various subcomponents and sections. the topSection is the uppermost part of the sidebar that is above the help call, then below the help call button the sidebarItems are rendered and finally below the sidebar items the bottomSection is rendered, all sections are delimited by a divider.',
      },
    },
  },
  argTypes: {
    isOpen: {
      description: 'Indicates whether the sidebar is open or closed.',
      control: 'boolean',
    },
    toggleSidebar: {
      description: 'Function called to open or close the sidebar.',
      action: 'toggleSidebar',
    },

    sidebarItems: {
      description: 'Array of objects defining the items to be rendered in the sidebar.',
      control: 'object',
    },
    auth: {
      description: "Object representing the user's authentication state.",
      control: 'object',
    },
    topSection: {
      description: 'React node to be rendered at the top of the sidebar.',
      control: 'object',
    },
    showEmergencyButton: {
      description: 'Indicates whether the emergency button is displayed.',
      control: 'boolean',
    },
    sidebarFooterItems: {
      description: 'Array of objects defining the items to be rendered in the sidebar footer.',
      control: 'object',
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

export const Default: StoryObj<CSideBarProps> = {
  args: {
    isOpen: true,
    toggleSidebar: () => alert('Toggle Sidebar'),
    sidebarItems: mockSidebarItems,
    sidebarFooterItems: mockSidebarItems,
    auth: mockAuthState as any,
    topSection: <div>Top Section</div>,
  },
}

export const IsOpenFalse: StoryObj<CSideBarProps> = {
  args: {
    isOpen: false,
    toggleSidebar: () => alert('Toggle Sidebar'),
    sidebarItems: mockSidebarItems,
    auth: mockAuthState as any,
    topSection: <div>Top Section</div>,
  },
}

export const SmallDevice: StoryObj<CSideBarProps> = {
  args: {
    isOpen: true,
    toggleSidebar: () => alert('Toggle Sidebar'),
    sidebarItems: mockSidebarItems,
    auth: mockAuthState as any,
    topSection: <div>Top Section</div>,
    sidebarFooterItems: mockSidebarItems,
  },
}

export const WithoutBottomSection: StoryObj<CSideBarProps> = {
  args: {
    isOpen: true,
    toggleSidebar: () => alert('Toggle Sidebar'),
    sidebarItems: mockSidebarItems,
    auth: mockAuthState as any,
    topSection: <div>Top Section</div>,
    sidebarFooterItems: mockSidebarItems,
  },
}

export const WithoutTopSection: StoryObj<CSideBarProps> = {
  args: {
    isOpen: true,
    toggleSidebar: () => alert('Toggle Sidebar'),
    sidebarItems: mockSidebarItems,
    auth: mockAuthState as any,
    sidebarFooterItems: mockSidebarItems,
  },
}

export const WithoutEmergencyButton: StoryObj<CSideBarProps> = {
  args: {
    isOpen: true,
    toggleSidebar: () => alert('Toggle Sidebar'),
    sidebarItems: mockSidebarItems,
    auth: mockAuthState as any,
    topSection: <div>Top Section</div>,
    showEmergencyButton: false,
    sidebarFooterItems: mockSidebarItems,
  },
}

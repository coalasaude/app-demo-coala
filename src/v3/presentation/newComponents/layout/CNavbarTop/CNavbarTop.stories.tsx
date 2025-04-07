/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { Meta, StoryObj } from '@storybook/react'

import { CNavbarTop, CNavbarTopProps } from './CNavbarTop'

const mockAuth = {
  user: {
    id: '123',
    name: 'John Doe',
    UserImage: {
      url: 'https://example.com/avatar.jpg',
    },
  },
}

const meta: Meta<CNavbarTopProps> = {
  title: 'Components/CNavbarTop',
  component: CNavbarTop,
  parameters: {
    docs: {
      description: {
        component:
          'CNavbarTop is a customizable navigation bar component that displays user information and provides menu options.',
      },
    },
  },
  argTypes: {
    toggleSidebar: {
      description: 'Function called when the sidebar toggle button is clicked.',
      action: 'toggleSidebar',
    },
    isOpenedSidebar: {
      description: 'Indicates whether the sidebar is currently open.',
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<CNavbarTopProps> = {
  args: {
    isOpenedSidebar: true,
  },
  decorators: [
    (Story) => {
      const useAuthMock = () => ({
        auth: mockAuth,
        logout: () => {},
      })
      return (
        <div style={{ position: 'relative' }}>
          <Story />
          <div id='modal-root' />
          <div style={{ display: 'none' }}>{useAuthMock() as any}</div>
        </div>
      )
    },
  ],
}

export const SidebarClosed: StoryObj<CNavbarTopProps> = {
  args: {
    isOpenedSidebar: false,
  },
  decorators: [
    (Story) => {
      const useAuthMock = () => ({
        auth: mockAuth,
        logout: () => {},
      })
      return (
        <div style={{ position: 'relative' }}>
          <Story />
          <div id='modal-root' />
          <div style={{ display: 'none' }}>{useAuthMock() as any}</div>
        </div>
      )
    },
  ],
}

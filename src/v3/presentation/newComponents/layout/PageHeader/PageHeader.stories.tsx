import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import PageHeader from './PageHeader'

const meta: Meta<typeof PageHeader> = {
  title: 'Layout/PageHeader',
  component: PageHeader,
  parameters: {
    docs: {
      description: {
        component:
          'Header component for pages, with mandatory title, optional back button and action button.',
      },
    },
  },
  argTypes: {
    title: {
      description:
        'A string referring to the header title which is wrapped by an Appbar component.',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    actionButtonProps: {
      description:
        'If passed, it will render a button on the right, receives an object that contains the props of the button component',
      control: 'object',
    },
    onBack: {
      description:
        'Function that is called when the back button is clicked, if not passed when clicking the button the function router.back() will be executed',
      control: 'function',
      table: {
        defaultValue: { summary: 'router.back()' },
      },
    },
    withArrowBack: {
      description: 'Whether the back button should be rendered',
      control: 'boolean',
      defaultValue: true,
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },

  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div id='navbar-actions' style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof PageHeader>

export const Default: Story = {
  args: {
    title: 'Title',
    onBack: () => alert('Back'),
  },
}

export const WithActionButton: Story = {
  args: {
    title: 'Title',
    actionButtonProps: {
      children: 'Action',
      onClick: () => alert('Action'),
      variant: 'contained',
    },
    onBack: () => alert('Back'),
  },
}

export const TwoButtons: Story = {
  args: {
    title: 'Title',
    actionButtonProps: {
      children: 'Action',
      onClick: () => alert('Action'),
      variant: 'contained',
    },
    secondaryButtonProps: {
      children: 'Secondary',
      onClick: () => alert('Secondary'),
      variant: 'outlined',
    },
    onBack: () => alert('Back'),
  },
}

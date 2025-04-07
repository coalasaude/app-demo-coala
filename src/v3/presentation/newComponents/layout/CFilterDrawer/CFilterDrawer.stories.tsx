import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Box, Typography } from '@mui/material'

import { CFilterDrawer } from './CFilterDrawer'

const meta: Meta<typeof CFilterDrawer> = {
  title: 'layout/CFilterDrawer',
  component: CFilterDrawer,
  parameters: {
    docs: {
      description: {
        component:
          'CFilterDrawer is a customizable drawer component that allows users to apply filters.',
      },
    },
  },
  argTypes: {
    open: {
      description: 'Indicates whether the drawer is open or closed.',
      control: 'boolean',
    },
    onClose: {
      description: 'Function called when the drawer is closed.',
      action: 'onClose',
    },
    onApply: {
      description: 'Function called when the apply button is clicked.',
      action: 'onApply',
    },
    onClear: {
      description: 'Function called when the clear button is clicked.',
      action: 'onClear',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CFilterDrawer>

export const Default: Story = {
  args: {
    open: true,
    children: (
      <Box>
        <Typography>Filter content goes here.</Typography>
      </Box>
    ),
  },
}

export const Closed: Story = {
  args: {
    open: false,
    children: (
      <Box>
        <Typography>Filter content goes here.</Typography>
      </Box>
    ),
  },
}

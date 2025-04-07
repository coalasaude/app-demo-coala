import { Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react'

import { CTooltip } from './CTooltip'

const meta: Meta<typeof CTooltip> = {
  title: 'Atoms/CTooltip',
  component: CTooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The `CTooltip` is used to display information about a component.',
      },
    },
  },
  argTypes: {
    description: {
      description: 'The description of the information.',
      control: 'text',
    },
    placement: {
      description: 'The placement of the tooltip.',
      control: {
        type: 'select',
        options: ['bottom', 'right', 'left', 'top'],
      },
    },
    children: {
      description: 'The children of the component.',
      control: 'React.ReactNode',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CTooltip>

export const Default: Story = {
  args: {
    description: 'This is a description',
    children: <Typography>Hover me</Typography>,
  },
}

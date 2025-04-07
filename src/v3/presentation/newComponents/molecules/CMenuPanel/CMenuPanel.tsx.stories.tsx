import type { Meta, StoryObj } from '@storybook/react'
import { Box } from '@mui/material'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'

import { CMenuPanel } from './CMenuPanel'

const meta: Meta<typeof CMenuPanel> = {
  title: 'Molecules/CMenuPanel',
  component: CMenuPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `CMenuPanel` component is used to display a menu panel with an icon and optional label.',
      },
    },
  },
  argTypes: {
    type: {
      description: 'The type of the menu panel.',
      control: {
        type: 'inline-radio',
        options: ['small', 'large'],
      },
    },
    icon: {
      description: 'The icon to be displayed.',
      control: 'none',
    },
    label: {
      description: 'The label of the menu panel.',
      control: 'text',
    },
    isSelected: {
      description: 'Whether the menu panel is selected.',
      control: 'boolean',
    },
    onClick: {
      description: 'The function to be called when the menu panel is clicked.',
      control: 'none',
    },
  },
}

export default meta

type Story = StoryObj<typeof CMenuPanel>

export const Default: Story = {
  render: (args) => (
    <Box width={200}>
      <CMenuPanel {...args} />
    </Box>
  ),
  args: {
    type: 'large',
    icon: <FlagOutlinedIcon />,
    label: 'Menu Item',
    isSelected: false,
  },
}

export const Small: Story = {
  render: (args) => (
    <Box width={200}>
      <CMenuPanel {...args} />
    </Box>
  ),
  args: {
    type: 'small',
    icon: <FlagOutlinedIcon />,
    isSelected: false,
  },
}

export const Selected: Story = {
  render: (args) => (
    <Box width={200}>
      <CMenuPanel {...args} />
    </Box>
  ),
  args: {
    type: 'large',
    icon: <FlagOutlinedIcon />,
    label: 'Menu Item',
    isSelected: true,
  },
}

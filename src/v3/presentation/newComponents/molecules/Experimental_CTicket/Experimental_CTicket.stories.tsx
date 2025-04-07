import type { Meta, StoryObj } from '@storybook/react'
import { Box } from '@mui/material'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'

import { Experimental_CTicket } from './Experimental_CTicket'

const meta: Meta<typeof Experimental_CTicket> = {
  title: 'Molecules/Experimental_CTicket',
  component: Experimental_CTicket,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `Experimental_CTicket` component is used to display information with a status.',
      },
    },
  },
  argTypes: {
    title: {
      description: 'The title of the information.',
      control: 'text',
    },
    description: {
      description: 'The description of the information.',
      control: 'text',
    },
    status: {
      description: 'The status of the information.',
      control: {
        type: 'inline-radio',
        options: ['active', 'inactive'],
      },
    },
    selected: {
      description: 'Whether the information is selected.',
      control: 'boolean',
    },
    color: {
      description:
        'The color of the icon and the texts. The color will only be displayed if disabled has false',
      control: 'color',
    },
    disabled: {
      description: 'Whether the information is disabled.',
      control: 'boolean',
    },
    icon: {
      description: 'The icon to be displayed.',
      defaultValue: null,
      control: 'none',
    },
  },
}

export default meta

type Story = StoryObj<typeof Experimental_CTicket>

export const Default: Story = {
  render: (args) => (
    <Box width={268}>
      <Experimental_CTicket {...args} />
    </Box>
  ),
  args: {
    title: 'Information',
    description: 'This is a description',
    icon: <FlagOutlinedIcon />,
    status: 'active',
    selected: true,
  },
}

export const Active: Story = {
  render: (args) => (
    <Box width={268}>
      <Experimental_CTicket {...args} />
    </Box>
  ),
  args: {
    title: 'Information',
    description: 'This is a description',
    status: 'active',
  },
}

export const Inactive: Story = {
  render: (args) => (
    <Box width={268}>
      <Experimental_CTicket {...args} />
    </Box>
  ),
  args: {
    title: 'Information',
    description: 'This is a description',
    status: 'inactive',
  },
}

export const ActiveSelected: Story = {
  render: (args) => (
    <Box width={268}>
      <Experimental_CTicket {...args} />
    </Box>
  ),
  args: {
    title: 'Information',
    description: 'This is a description',
    status: 'active',
    selected: true,
  },
}

export const InactiveSelected: Story = {
  render: (args) => (
    <Box width={268}>
      <Experimental_CTicket {...args} />
    </Box>
  ),
  args: {
    title: 'Information',
    description: 'This is a description',
    status: 'inactive',
    selected: true,
  },
}

export const WithoutStatusWithColorAndIcon: Story = {
  render: (args) => (
    <Box width={268}>
      <Experimental_CTicket {...args} />
    </Box>
  ),
  args: {
    title: 'Information',
    description: 'This is a description',
    color: ' var(--mui-palette-primary-main)',
    icon: <FlagOutlinedIcon />,
  },
}

export const DisabledWithoutStatusAndIcon: Story = {
  render: (args) => (
    <Box width={268}>
      <Experimental_CTicket {...args} />
    </Box>
  ),
  args: {
    title: 'Information',
    description: 'This is a description',
    icon: <FlagOutlinedIcon />,
    disabled: true,
  },
}

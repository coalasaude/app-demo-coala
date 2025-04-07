import type { Meta, StoryObj } from '@storybook/react'
import { VerifiedUser } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'

import { CCardColor } from './CCardColor'

const meta: Meta<typeof CCardColor> = {
  title: 'Atoms/CCardColor',
  component: CCardColor,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `CCardColor` component provides a customizable way to display a colored card.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: {
        type: 'select',
        options: ['success', 'error', 'warning', 'info'],
      },
      description: 'Visual state of the card',
    },
    children: {
      description:
        'The content rendered within the card. It can be any React node from addons created by the user.',
    },
    boxProps: {
      description: 'The props of the Box component from Material',
    },
  },
}

export default meta
type Story = StoryObj<typeof CCardColor>

export const Default: Story = {
  args: {
    state: 'success',
    boxProps: {
      sx: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      },
    },
  },
}

export const Error: Story = {
  args: {
    state: 'error',
    boxProps: {
      sx: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      },
    },
  },
}

export const Warning: Story = {
  args: {
    state: 'warning',
    boxProps: {
      sx: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      },
    },
  },
}

export const Info: Story = {
  args: {
    state: 'info',
    boxProps: {
      sx: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      },
    },
  },
}

export const WithChildren: Story = {
  args: {
    state: 'success',
    children: (
      <Box gap={2} display='flex' flexDirection='row' alignItems='center'>
        <VerifiedUser color='success' />
        <Typography color='var(--mui-palette-success-main)'>Verified</Typography>
      </Box>
    ),
    boxProps: {
      sx: {
        padding: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  },
}

import type { Meta, StoryObj } from '@storybook/react'
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined'

import { CBadge } from './index'

const meta: Meta<typeof CBadge> = {
  title: 'Atoms/CBadge',
  component: CBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `CBadge` component provides a customizable way to display badges on icons or other elements. It builds upon the Material UI Badge component, offering control over type and state.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
      description: 'Size of the badge',
    },
    state: {
      control: {
        type: 'select',
        options: [
          'disabled',
          'primary',
          'secondary',
          'success',
          'error',
          'warning',
          'info',
          'emergency',
        ],
      },
      description: 'Visual state of the badge',
    },
    badgeContent: {
      control: 'number',
      description: 'The content rendered within the badge',
    },
  },
}

export default meta

type CBadgeStory = StoryObj<typeof CBadge>

export const Default: CBadgeStory = {
  args: {
    state: 'primary',
    children: <NotificationsIcon />,
    badgeContent: 4,
    type: 'small',
  },
}

export const TypeMedium: CBadgeStory = {
  args: {
    state: 'primary',
    children: <NotificationsIcon />,
    badgeContent: 10,
    type: 'medium',
  },
}

export const TypeLarge: CBadgeStory = {
  args: {
    state: 'primary',
    children: <NotificationsIcon />,
    badgeContent: 100,
    type: 'large',
  },
}

export const Disabled: CBadgeStory = {
  args: {
    state: 'disabled',
    children: <NotificationsIcon />,
    badgeContent: 4,
    type: 'medium',
  },
}

export const Success: CBadgeStory = {
  args: {
    state: 'success',
    children: <NotificationsIcon />,
    badgeContent: 4,
    type: 'medium',
  },
}

export const Error: CBadgeStory = {
  args: {
    state: 'error',
    children: <NotificationsIcon />,
    badgeContent: 4,
    type: 'medium',
  },
}

export const Info: CBadgeStory = {
  args: {
    state: 'info',
    children: <NotificationsIcon />,
    badgeContent: 4,
    type: 'medium',
  },
}

export const Primary: CBadgeStory = {
  args: {
    state: 'primary',
    children: <NotificationsIcon />,
    badgeContent: 4,
    type: 'medium',
  },
}

export const Secondary: CBadgeStory = {
  args: {
    state: 'secondary',
    children: <NotificationsIcon />,
    badgeContent: 4,
    type: 'medium',
  },
}

export const Warning: CBadgeStory = {
  args: {
    state: 'warning',
    children: <NotificationsIcon />,
    badgeContent: 4,
    type: 'medium',
  },
}

export const Emergency: CBadgeStory = {
  args: {
    state: 'emergency',
    children: <NotificationsIcon />,
    badgeContent: 4,
    type: 'medium',
  },
}

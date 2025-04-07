import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { HealthAndSafety } from '@mui/icons-material'

import CButton from './CButton'

const meta: Meta<typeof CButton> = {
  title: 'Atoms/CButton',
  component: CButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The `CButton` is a styled button that can be used for trigger actions.',
      },
    },
  },
  argTypes: {
    variant: {
      description: 'The button variants to use.',
      defaultValue: 'primary',
    },
    size: {
      description: 'The size of the button.',
      defaultValue: 'medium',
    },
    disabled: {
      description: 'If `true`, the button will be disabled.',
      defaultValue: false,
    },
    loading: {
      description: 'If `true`, the button will show a loading spinner.',
      defaultValue: false,
    },
    children: {
      description:
        'The content of the component, which can be any React node like text, icons, etc.',
      defaultValue: 'Button',
    },
    onClick: {
      description: 'The event handler to call when the button is clicked.',
      action: 'clicked',
    },
    href: {
      description:
        'The URL to link to when the button is clicked. This makes the button an anchor.',
    },
    target: {
      description: 'Specifies where to open the linked document.',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CButton>

export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    disabled: false,
    loading: false,
    children: 'Button',
  },
}

export const ButtonWithIcon: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    disabled: false,
    loading: false,
    children: (
      <>
        <HealthAndSafety />
        Button
      </>
    ),
  },
}

export const SecondaryWithIcon: Story = {
  args: {
    variant: 'secondary',
    size: 'small',
    disabled: false,
    loading: false,
    children: (
      <>
        <HealthAndSafety />
        Button
      </>
    ),
  },
}

export const LinkWithIcon: Story = {
  args: {
    variant: 'link',
    size: 'small',
    disabled: false,
    loading: false,
    children: (
      <>
        <HealthAndSafety />
        Button
      </>
    ),
  },
}

export const ButtonAsAnchor: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    disabled: false,
    loading: false,
    href: 'https://coalasaude.com.br',
    target: '_blank',
    children: 'Go to Coala',
  },
}

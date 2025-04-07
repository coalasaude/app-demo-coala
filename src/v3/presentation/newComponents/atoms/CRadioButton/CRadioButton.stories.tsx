import type { Meta, StoryObj } from '@storybook/react'

import { CRadioButton } from './CRadioButton'

const meta: Meta<typeof CRadioButton> = {
  title: 'Atoms/CRadioButton',
  component: CRadioButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `CRadioButton` component is a customizable radio button input. It allows users to make a single selection from a set of options. This component is designed to be used within forms or as standalone choices. Customize its appearance and behavior by adjusting the props.',
      },
    },
  },
  argTypes: {
    checked: {
      description: 'If `true`, the radio button will be checked.',
      defaultValue: false,
    },
    size: {
      description: 'The size of the radio button.',
      defaultValue: 'medium',
    },
    disabled: {
      description: 'If `true`, the radio button will be disabled.',
      defaultValue: false,
    },
    onClick: {
      description: 'The event handler to call when the radio button is checked.',
      action: 'checked',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CRadioButton>

export const Default: Story = {
  args: {
    checked: true,
    onClick: () => alert('onClick'),
  },
}

export const Unchecked: Story = {
  args: {
    checked: false,
    onClick: () => alert('onClick'),
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

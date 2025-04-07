import type { Meta, StoryObj } from '@storybook/react'

import CCodeInput from './CCodeInput'

const meta: Meta<typeof CCodeInput> = {
  title: 'Molecules/CCodeInput',
  component: CCodeInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CCodeInput>

export const Default: Story = {
  args: {
    label: 'Código de verificação',
  },
}

export const Invalid: Story = {
  args: {
    label: 'Código de verificação',
    error: true,
  },
}

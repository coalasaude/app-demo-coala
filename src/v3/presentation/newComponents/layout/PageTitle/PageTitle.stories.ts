import type { Meta, StoryObj } from '@storybook/react'

import PageTitle from './PageTitle'

const meta: Meta<typeof PageTitle> = {
  title: 'Layout/PageTitle',
  component: PageTitle,
  argTypes: {
    children: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PageTitle>

export const Default: Story = {
  args: {
    children: 'Título padrão',
  },
}

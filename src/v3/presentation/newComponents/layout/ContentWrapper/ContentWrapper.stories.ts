import type { Meta, StoryObj } from '@storybook/react'

import ContentWrapper from './styles'

const meta: Meta<typeof ContentWrapper> = {
  title: 'Layout/ContentWrapper',
  component: ContentWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ContentWrapper>

export const Default: Story = {
  args: {
    border: 1,
  },
}

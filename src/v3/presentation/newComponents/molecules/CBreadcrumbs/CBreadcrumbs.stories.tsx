import type { Meta, StoryObj } from '@storybook/react'

import { CBreadcrumbs } from './index'

const meta: Meta<typeof CBreadcrumbs> = {
  title: 'molecules/CBreadcrumbs',
  component: CBreadcrumbs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `CBreadcrumbs` component provides a customizable way to display breadcrumb navigation. It builds upon the Material UI Breadcrumbs component, offering control over the separator variant.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select', options: ['text', 'icon'] },
      description: 'The variant of the breadcrumb separator',
    },
  },
}

export default meta

type CBreadcrumbsStory = StoryObj<typeof CBreadcrumbs>

export const Default: CBreadcrumbsStory = {
  args: {
    variant: 'text',
  },
}

export const WithIconSeparator: CBreadcrumbsStory = {
  args: {
    variant: 'icon',
  },
}

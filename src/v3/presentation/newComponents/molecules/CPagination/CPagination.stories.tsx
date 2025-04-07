import type { Meta, StoryObj } from '@storybook/react'

import { CPagination } from './index'

const meta: Meta<typeof CPagination> = {
  title: 'molecules/CPagination',
  component: CPagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `CPagination` component is a customizable pagination component that allows users to navigate through pages of content. It adapts its appearance based on the screen size, showing fewer sibling pages on smaller devices.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    count: { control: 'number', description: 'The total number of pages' },
    totalCount: { control: 'number', description: 'The total number of items' },
    page: { control: 'number', description: 'The current page number' },
    onChange: { action: 'onChange', description: 'Callback fired when the page is changed' },
    variant: {
      control: { type: 'select', options: ['outlined', 'text'] },
      description: 'The variant of the pagination buttons',
    },
    color: {
      control: { type: 'select', options: ['primary', 'secondary', 'standard'] },
      description: 'The color of the pagination buttons',
    },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
      description: 'The size of the pagination buttons',
    },
    disabled: { control: 'boolean', description: 'If true, the pagination is disabled' },
  },
}

export default meta

type CPaginationStory = StoryObj<typeof CPagination>

export const Default: CPaginationStory = {
  args: {
    count: 10,
    page: 1,
    totalCount: 100,
  },
}

export const OutlinedVariant: CPaginationStory = {
  args: {
    count: 10,
    page: 1,
    variant: 'outlined',
    totalCount: 100,
  },
}

export const SecondaryColor: CPaginationStory = {
  args: {
    count: 10,
    page: 1,
    color: 'secondary',
    totalCount: 100,
  },
}

export const LargeSize: CPaginationStory = {
  args: {
    count: 10,
    page: 1,
    size: 'large',
    totalCount: 100,
  },
}

export const Disabled: CPaginationStory = {
  args: {
    count: 10,
    page: 1,
    disabled: true,
    totalCount: 100,
  },
}

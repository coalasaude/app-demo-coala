import type { Meta, StoryObj } from '@storybook/react'

import { CSelect } from './index'

const meta: Meta<typeof CSelect> = {
  title: 'Atoms/CSelect',
  component: CSelect,
  parameters: {
    docs: {
      description: {
        component:
          'The `CSelect` component provides a customizable dropdown select input. It builds upon the Material UI Select component, offering control over options, null option text, and the ability to disable the null option.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'An array of options to be displayed in the select dropdown',
    },
    nullOptionText: {
      control: 'text',
      description: 'The text to be displayed for the null option',
    },
    disabledNullOption: {
      control: 'boolean',
      description: 'Determines whether or not the null option is disabled',
    },
    label: { control: 'text', description: 'The label for the select input' },
    onChange: { action: 'onChange', description: 'Action triggered on select value change' },
  },
}

export default meta

type CSelectStory = StoryObj<typeof CSelect>

export const Default: CSelectStory = {
  args: {
    label: 'Select an option',
    options: [
      { value: 1, label: 'Option 1' },
      { value: 2, label: 'Option 2' },
      { value: 3, label: 'Option 3' },
    ],
  },
}

export const WithNullOption: CSelectStory = {
  args: {
    label: 'Select an option',
    options: [
      { value: 1, label: 'Option 1' },
      { value: 2, label: 'Option 2' },
      { value: 3, label: 'Option 3' },
    ],
    nullOptionText: 'Select an option',
  },
}

export const DisabledNullOption: CSelectStory = {
  args: {
    label: 'Select an option',
    options: [
      { value: 1, label: 'Option 1' },
      { value: 2, label: 'Option 2' },
      { value: 3, label: 'Option 3' },
    ],
    disabledNullOption: true,
  },
}

export const OnChange: CSelectStory = {
  args: {
    label: 'Select an option',
    options: [
      { value: 1, label: 'Option 1' },
      { value: 2, label: 'Option 2' },
      { value: 3, label: 'Option 3' },
    ],
    onChange: (event) => {
      alert(`Selected value: ${event.target.value}`)
    },
  },
}

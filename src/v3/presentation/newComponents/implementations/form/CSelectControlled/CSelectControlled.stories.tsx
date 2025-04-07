import type { Meta, StoryObj } from '@storybook/react'
import { useForm, FormProvider } from 'react-hook-form'

import { CSelectControlled } from './index'

const meta: Meta<typeof CSelectControlled> = {
  title: 'Implementation/Form/CSelectControlled',
  component: CSelectControlled,
  parameters: {
    docs: {
      description: {
        component:
          'The `CSelectControlled` component provides a controlled version of the `CSelect` component. It integrates with the `react-hook-form` library for form state management.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'The name of the form field',
    },
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
    errorMessage: {
      control: 'text',
      description: 'The error message to be displayed',
    },
    showClearButton: {
      control: 'boolean',
      description: 'Determines whether or not the clear button is displayed',
    },
  },
}

export default meta

type CSelectControlledStory = StoryObj<typeof CSelectControlled>

const Template = (args: CSelectControlledStory) => {
  const methods = useForm({
    defaultValues: {
      controlledSelect: '',
    },
  })

  return (
    <FormProvider {...methods}>
      <form>
        <CSelectControlled {...(args as any)} />
      </form>
    </FormProvider>
  )
}

export const Default: CSelectControlledStory = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'controlledSelect',
    label: 'Select an option',
    options: [
      { value: 1, label: 'Option 1' },
      { value: 2, label: 'Option 2' },
      { value: 3, label: 'Option 3' },
    ],
  },
}

export const WithNullOption: CSelectControlledStory = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'controlledSelect',
    label: 'Select an option',
    options: [
      { value: 1, label: 'Option 1' },
      { value: 2, label: 'Option 2' },
      { value: 3, label: 'Option 3' },
    ],
    nullOptionText: 'Select an option',
  },
}

export const DisabledNullOption: CSelectControlledStory = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'controlledSelect',
    label: 'Select an option',
    options: [
      { value: 1, label: 'Option 1' },
      { value: 2, label: 'Option 2' },
      { value: 3, label: 'Option 3' },
    ],
    disabledNullOption: true,
  },
}

export const WithError: CSelectControlledStory = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'controlledSelect',
    label: 'Select an option',
    options: [
      { value: 1, label: 'Option 1' },
      { value: 2, label: 'Option 2' },
      { value: 3, label: 'Option 3' },
    ],
    errorMessage: 'This field is required',
  },
}

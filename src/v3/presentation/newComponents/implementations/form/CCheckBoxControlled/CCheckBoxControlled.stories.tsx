import { Meta, StoryObj } from '@storybook/react'
import { FormProvider, useForm } from 'react-hook-form'

import { CCheckBoxControlled } from './index'

const meta: Meta<typeof CCheckBoxControlled> = {
  title: 'Implementation/Form/CCheckBoxControlled',
  component: CCheckBoxControlled,
  decorators: [
    (Story) => {
      const methods = useForm()
      return (
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit((data) => {
              alert('open console to see the data from the form')
              // eslint-disable-next-line no-console
              console.log(data)
            })}
          >
            <Story />
          </form>
        </FormProvider>
      )
    },
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '`CCheckBoxControlled` is a component integrating a checkbox with react-hook-form for form control and validation.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'The name of the form field for form control.',
    },
    rules: {
      control: 'object',
      description: 'Validation rules for react-hook-form.',
    },
    onBlur: {
      action: 'blurred',
      description: 'Function called on checkbox blur.',
    },
    error: {
      control: 'text',
      description: 'Custom error message.',
    },
    label: {
      control: 'text',
      description: 'Label for the checkbox group.',
    },
    values: {
      control: 'object',
      description: 'Values and labels of the checkboxes.',
    },
    formGroupProps: {
      control: 'object',
      description: 'Additional props for the FormGroup.',
    },
    labelPlacement: {
      control: { type: 'select', options: ['end', 'start', 'top', 'bottom'] },
      description: 'Placement of the checkbox label.',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CCheckBoxControlled>

export const Default: Story = {
  args: {
    name: 'exampleCheckbox',
    label: 'Example Checkbox',
    values: { value: 'example', label: 'Example Label' },
  },
}

export const WithError: Story = {
  args: {
    name: 'errorCheckbox',
    label: 'Error Checkbox',
    values: { value: 'error', label: 'Error Label' },
    error: 'Custom error message',
  },
}

export const CustomLabelPlacement: Story = {
  args: {
    name: 'customPlacementCheckbox',
    label: 'Custom Placement Checkbox',
    values: { value: 'customPlacement', label: 'CustomLabel' },
    labelPlacement: 'top',
  },
}

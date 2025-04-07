import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { useForm, FormProvider } from 'react-hook-form'

import { CCheckBoxGroupControlled } from './CCheckBoxGroupControlled'

const FormWrapper = ({ children }: any) => {
  const methods = useForm()
  return <FormProvider {...methods}>{children}</FormProvider>
}

const meta: Meta<typeof CCheckBoxGroupControlled> = {
  title: 'Implementation/Form/CCheckBoxGroupControlled',
  component: CCheckBoxGroupControlled,
  decorators: [
    (Story) => (
      <FormWrapper>
        <Story />
      </FormWrapper>
    ),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '`CCheckBoxGroupControlled` integrates multiple checkboxes with react-hook-form, providing a controlled group with optional validation.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the group of checkboxes.',
    },
    helperText: {
      control: 'text',
      description: 'Helper text or error message displayed under the group.',
    },
    options: {
      control: 'object',
      description:
        'Options for the checkboxes, including name, label, value, and rules for validation.',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CCheckBoxGroupControlled>

export const Default: Story = {
  args: {
    label: 'Favorite Programming Languages',
    helperText: 'Select your favorite programming languages',
    options: [
      { name: 'languages.js', label: 'JavaScript', value: 'js' },
      { name: 'languages.python', label: 'Python', value: 'python' },
      { name: 'languages.rust', label: 'Rust', value: 'rust' },
    ],
  },
}

export const WithValidationError: Story = {
  args: {
    label: 'Choose Your IDE',
    helperText: 'Please select at least one IDE',
    options: [
      {
        name: 'ide.vscode',
        label: 'VS Code',
        value: 'vscode',
        rules: { required: 'You must select at least one IDE.' },
      },
      { name: 'ide.intellij', label: 'IntelliJ IDEA', value: 'intellij' },
      { name: 'ide.eclipse', label: 'Eclipse', value: 'eclipse' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates validation error messages when no options are selected.',
      },
    },
  },
}

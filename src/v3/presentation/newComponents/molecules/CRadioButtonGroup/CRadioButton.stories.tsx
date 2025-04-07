import { Meta, StoryObj } from '@storybook/react'
import { FormProvider, useForm } from 'react-hook-form'

import { CRadioButtonGroup } from './CRadioButtonGroup'

const meta: Meta<typeof CRadioButtonGroup> = {
  title: 'Molecules/CRadioButtonGroup',
  component: CRadioButtonGroup,
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
          'The `CRadioButtonGroup` component is a customizable radio button group. It allows users to make a single selection from a set of options. This component is designed to be used within forms. Customize its appearance and behavior by adjusting the props.',
      },
    },
  },
  argTypes: {
    field: {
      value: 'option1',
      name: 'radioButtonGroup',
      ref: () => null,
      onChange: () => null,
      onBlur: () => null,
    },
    options: {
      defaultValue: [
        {
          value: 'option1',
          label: 'Option 1',
        },
        {
          value: 'option2',
          label: 'Option 2',
        },
        {
          value: 'option3',
          label: 'Option 3',
        },
      ],
      name: 'Options',
      description: 'The options for the radio button group',
      control: 'object',
    },
    label: {
      control: 'text',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CRadioButtonGroup>

export const Default: Story = {
  args: {
    label: 'Label',
    labelPlacement: 'end',
    field: {
      value: 'option1',
      name: 'radioButtonGroup',
      ref: () => null,
      onChange: () => null,
      onBlur: () => null,
    },
    name: 'radioButtonGroup',
    options: [
      {
        value: 'option1',
        label: 'Option 1',
      },
      {
        value: 'option2',
        label: 'Option 2',
      },
      {
        value: 'option3',
        label: 'Option 3',
      },
    ],
  },
}

export const Disabled: Story = {
  args: {
    label: 'Label',
    labelPlacement: 'end',
    name: 'radioButtonGroup',
    field: {
      value: 'option1',
      name: 'radioButtonGroup',
      ref: () => null,
      onChange: () => null,
      onBlur: () => null,
    },
    options: [
      {
        value: 'option1',
        label: 'Option 1',
      },
      {
        value: 'option2',
        label: 'Option 2',
      },
      {
        value: 'option3',
        label: 'Option 3',
      },
    ],
    disabled: true,
  },
}

export const Error: Story = {
  args: {
    label: 'Label',
    labelPlacement: 'end',
    name: 'radioButtonGroup',
    field: {
      value: 'option1',
      name: 'radioButtonGroup',
      ref: () => null,
      onChange: () => null,
      onBlur: () => null,
    },
    options: [
      {
        value: 'option1',
        label: 'Option 1',
      },
      {
        value: 'option2',
        label: 'Option 2',
      },
      {
        value: 'option3',
        label: 'Option 3',
      },
    ],
    error: 'This is an error',
  },
}

export const LabelTop: Story = {
  args: {
    label: 'Label',
    labelPlacement: 'top',
    name: 'radioButtonGroup',
    field: {
      value: 'option1',
      name: 'radioButtonGroup',
      ref: () => null,
      onChange: () => null,
      onBlur: () => null,
    },
    options: [
      {
        value: 'option1',
        label: 'Option 1',
      },
      {
        value: 'option2',
        label: 'Option 2',
      },
      {
        value: 'option3',
        label: 'Option 3',
      },
    ],
  },
}

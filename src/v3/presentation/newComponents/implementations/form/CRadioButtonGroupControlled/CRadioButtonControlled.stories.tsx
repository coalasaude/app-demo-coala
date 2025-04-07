import { Meta, StoryObj } from '@storybook/react'
import { FormProvider, useForm } from 'react-hook-form'

import { CRadioButtonGroupControlled } from './CRadioButtonGroupControlled'

const meta: Meta<typeof CRadioButtonGroupControlled> = {
  title: 'Implementation/Form/CRadioButtonGroupControlled',
  component: CRadioButtonGroupControlled,
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
          'The `CRadioButtonGroup` component is a customizable radio button group controlled. It allows users to make a single selection from a set of options. This component is designed to be used within forms. Customize its appearance and behavior by adjusting the props.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CRadioButtonGroupControlled>

export const Default: Story = {
  args: {
    label: 'Label',
    labelPlacement: 'end',
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

export const LabelPlacementBottom: Story = {
  args: {
    label: 'Label Placement bottom',
    labelPlacement: 'bottom',
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

export const LabelPlacementTop: Story = {
  args: {
    label: 'Label Placement top',
    labelPlacement: 'top',
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

export const LabelPlacementStart: Story = {
  args: {
    label: 'Label Placement start',
    labelPlacement: 'start',
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

import { Meta, StoryObj } from '@storybook/react'
import { FormProvider, useForm } from 'react-hook-form'

import { CTimePickerControlled } from './CTimePickerControlled'

const meta: Meta<typeof CTimePickerControlled> = {
  title: 'Implementation/Form/CTimePickerControlled',
  component: CTimePickerControlled,
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
          'The `CTimePickerControlled` component is a customizable time picker controlled by React Hook Form. It allows users to select a time value. This component is designed to be used within forms. Customize its appearance and behavior by adjusting the props.',
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

type Story = StoryObj<typeof CTimePickerControlled>

export const Default: Story = {
  args: {
    label: 'Select Time',
    name: 'timePicker',
  },
}

export const WithDefaultValue: Story = {
  args: {
    label: 'Select Time',
    name: 'timePicker',
    defaultValue: '10:30',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Select Time',
    name: 'timePicker',
    disabled: true,
  },
}

export const Error: Story = {
  args: {
    label: 'Select Time',
    name: 'timePicker',
    error: 'This is an error',
  },
}

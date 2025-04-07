import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { CSwitchControlled, CSwitchControlledProps } from './CSwitchControlled'

const meta: Meta<typeof CSwitchControlled> = {
  title: 'Implementation/Form/CSwitchControlled',
  component: CSwitchControlled,
  parameters: {
    docs: {
      description: {
        component: 'A controlled switch component that integrates with react-hook-form.',
      },
    },
  },
  argTypes: {
    name: {
      description: 'The name of the switch field in the form.',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      description: 'The label text for the switch.',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CSwitchControlled>

const Template = (args: CSwitchControlledProps) => {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <CSwitchControlled {...args} />
    </FormProvider>
  )
}

export const Default: Story = {
  render: () => <Template name='switchField' label='Switch Label' />,
}

export const Checked: Story = {
  render: () => <Template name='switchField' label='Switch Label' defaultChecked />,
}

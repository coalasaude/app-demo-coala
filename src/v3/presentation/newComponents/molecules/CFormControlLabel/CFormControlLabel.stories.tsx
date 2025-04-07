import { Meta, StoryObj } from '@storybook/react'

import { CFormControlLabel } from './CFormControlLabel'

const meta: Meta<typeof CFormControlLabel> = {
  title: 'Molecules/CFormControlLabel',
  component: CFormControlLabel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `CFormControlLabel` component is a wrapper for the `FormControlLabel` component from Material-UI. It is used to create a label for a form control, such as a checkbox or radio button. Customize its appearance and behavior by adjusting the props.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
    },
    control: {
      control: 'object',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CFormControlLabel>

export const Default: Story = {
  args: {
    label: 'Label',
    control: <input type='checkbox' />,
  },
}

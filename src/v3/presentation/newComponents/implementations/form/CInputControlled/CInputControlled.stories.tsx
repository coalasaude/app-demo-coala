import type { Meta, StoryObj } from '@storybook/react'
import { useForm, FormProvider } from 'react-hook-form'

import CInputControlled from './index'

const meta: Meta<typeof CInputControlled> = {
  title: 'Implementation/Form/CInputControlled',
  component: CInputControlled,
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
            <button type='submit'>Submit</button>
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
          'The `CInputControlled` component is a controlled version, designed for use in forms where the input state needs to be managed externally by React, through React Hook Form. It is ideal for situations requiring a more direct integration with form logic, validations, and input/output data transformations.\n\n### Behavior and Features:\n\n- **Integration with React Hook Form**: The component uses `useFormContext` from React Hook Form to access the forms control object, allowing for effective synchronization between the fields state and the form.\n\n- **Data Validation**: Supports defining validation rules (`rules`) directly in the component, facilitating the implementation of complex and custom validation logic.\n\n- **Data Transformations**: Offers the possibility to transform input (`input`) and output (`output`) data through transformation functions. This allows for fine control over data processing before they are displayed or sent, such as formatting and string cleaning.\n\n- **Customizable Events**: Allows for the definition of handlers for events like `onChange` and `onBlur`, enabling the execution of additional data handling or interface logic when the user interacts with the field.\n\n- **Error Messages and Help Text**: Integrates with the forms error state to display specific error messages, in addition to supporting help text (`helperText`) that can be dynamic, based on the presence of errors or additional information.\n\n### Example of Use:\n\nThe `CInputControlled` component is adjustable to suit a variety of input needs in forms, promoting a clear and straightforward user experience while offering robust and flexible integration with form logic.\n\nIdeal for use cases that require strict control over the input state, custom validations, and data manipulations, this component ensures that developers have the necessary tools to create complex and interactive forms efficiently and accurately.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof CInputControlled>

export const Default: Story = {
  args: {
    placeholder: 'Placeholder',
    label: 'Label',
    name: 'input',
  },
}

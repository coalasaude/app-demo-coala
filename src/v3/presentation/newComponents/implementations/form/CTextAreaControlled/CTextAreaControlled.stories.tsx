import type { Meta, StoryObj } from '@storybook/react'
import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '@mui/material'

import CTextAreaControlled from './CTextAreaControlled'

const meta: Meta<typeof CTextAreaControlled> = {
  title: 'Implementation/Form/CTextAreaControlled',
  component: CTextAreaControlled,
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
            <Button sx={{ marginTop: '16px' }} type='submit'>
              Submit
            </Button>
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
          'The `CTextAreaControlled` component is a controlled text area version, designed for use in forms where input state needs to be managed externally by React, through React Hook Form. This component is ideal for situations requiring more direct integration with form logic, validations, and input/output data transformations. Extending the functionalities of CInputControlled, CTextAreaControlled adds specific support for multiline text input, allowing for more extensive user text input.\n###Behavior and Features:\nReact Hook Form Integration: Similar to CInputControlled, CTextAreaControlled uses useFormContext from React Hook Form to access the forms control object, enabling effective synchronization between the field state and the form.\n\nMultiline Text Support: Specially designed to capture more extensive text inputs, it offers properties like rows, maxRows, and minRows to adjust the text areas height as needed.\n\nCharacter Limit: Includes a limit property that allows developers to specify a maximum number of characters allowed, enforcing data entry limitations and providing real-time visual feedback on the character limit through helper text.\n\nData Validation: Retains support for defining validation rules (rules) directly within the component, facilitating the implementation of complex and customized validation logic.\n\nData Transformations: Offers the possibility to transform input (input) and output (output) data through transformation functions, allowing for fine control over data processing before they are displayed or sent.\n\nCustomizable Events: Allows for the definition of handlers for events such as onChange and onBlur, enabling the execution of additional data handling or interface logic when the user interacts with the field.\n\nError Messages and Helper Text: Integrates with the forms error state to display specific error messages, in addition to supporting dynamic helper text (helperText) based on the presence of errors or additional information.\n\nExample of Use:\nCTextAreaControlled is adjustable to meet a variety of input needs in forms, promoting a clear and straightforward user experience while offering robust and flexible integration with form logic. Ideal for use cases that require strict control over input state, custom validations, and data manipulations, this component ensures developers have the necessary tools to create complex and interactive forms efficiently and accurately.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof CTextAreaControlled>

export const Default: Story = {
  args: {
    placeholder: 'Placeholder',
    label: 'Label',
    name: 'textarea',
  },
}

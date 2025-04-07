import type { Meta, StoryObj } from '@storybook/react'
import { useForm, FormProvider } from 'react-hook-form'

import { CFileInputControlled } from './CFileInputControlled'

const meta: Meta<typeof CFileInputControlled> = {
  title: 'Implementation/Form/CFileInputControlled',
  component: CFileInputControlled,
  decorators: [
    (Story) => {
      const methods = useForm()
      return (
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit((data) => {
              alert('Open console to see the data from the form')
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
          'The `CFileInputControlled` component is a controlled version of the file input, designed for use in forms where the file input state needs to be managed externally by React, through React Hook Form. It is ideal for situations requiring a more direct integration with form logic, validations, and file handling.\n\n### Behavior and Features:\n\n- **Integration with React Hook Form**: The component uses `useFormContext` from React Hook Form to access the forms control object, allowing for effective synchronization between the file input state and the form.\n\n- **File Validation**: Supports defining validation rules directly in the component, facilitating the implementation of complex and custom file validation logic.\n\n- **Error Messages**: Integrates with the forms error state to display specific error messages related to the file input.\n\n- **Customizable Labels and Placeholders**: Allows for customization of the label text and placeholder based on the selected file.\n\n### Example of Use:\n\nThe `CFileInputControlled` component is adjustable to suit a variety of file input needs in forms, promoting a clear and straightforward user experience while offering robust and flexible integration with form logic.\n\nIdeal for use cases that require strict control over the file input state, custom validations, and file handling, this component ensures that developers have the necessary tools to create complex and interactive forms efficiently and accurately.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof CFileInputControlled>

export const Default: Story = {
  args: {
    name: 'file',
    accept: 'image/*',
    label: 'Upload an image',
    placeholder: 'Select an image file',
  },
}

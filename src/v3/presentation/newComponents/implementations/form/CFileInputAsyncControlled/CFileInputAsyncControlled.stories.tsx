import type { Meta, StoryObj } from '@storybook/react'
import { useForm, FormProvider } from 'react-hook-form'

import { CFileInputAsyncControlled } from './CFileInputAsyncControlled'

const meta: Meta<typeof CFileInputAsyncControlled> = {
  title: 'Implementation/Form/CFileInputAsyncControlled',
  component: CFileInputAsyncControlled,
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
          'The CFileInputAsyncControlled component enhances the CFileInputControlled by adding real-time file upload capabilities. This controlled file input component is specifically designed for use in forms where both the state of the file input and the file uploading process need to be managed externally via React, typically using React Hook Form. This component is particularly useful in scenarios where immediate server-side file handling is required upon file selection.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof CFileInputAsyncControlled>

export const Default: Story = {
  args: {
    name: 'file',
    accept: 'image/*',
    label: 'Upload an image',
    placeholder: 'Select an image file',
    onUploadFunc: async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve({})
        }, 2000)
      })

      return 100
    },
  },
}

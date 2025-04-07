/* eslint-disable no-console */
import { Meta, StoryObj } from '@storybook/react'

import { CFileInput, ICFileInput } from './CFileInput'

const meta: Meta<ICFileInput> = {
  title: 'Components/CFileInput',
  component: CFileInput,
  parameters: {
    docs: {
      description: {
        component:
          'The `CFileInput` is a custom file input component that allows users to select a file from their device. It provides a visually appealing and intuitive interface for file selection, with customizable options such as accept types, labels, and icons.\n\n**Features:**\n- **File Selection:** Allows users to select a file from their device by clicking on the input or the upload icon.\n- **Customizable Accept Types:** Specifies the types of files that can be selected using the `accept` prop.\n- **Customizable Labels and Icons:** Allows customization of the label text and upload icon.\n- **Error Handling:** Displays error messages if provided, to indicate any validation errors.\n\n**Recommended Use:**\nIdeal for scenarios where users need to upload files, such as document submission, image selection, or any other file-related tasks.',
      },
    },
  },
  argTypes: {
    accept: {
      description: 'Specifies the types of files that can be selected.',
      control: 'text',
    },
    onChange: {
      description: 'Function called when a file is selected.',
      control: 'function',
    },
    label: {
      description: 'Label text for the file input.',
      control: 'text',
    },
    variant: {
      description: 'Variant of the file input.',
      control: 'select',
      options: ['standard', 'filled', 'outlined'],
    },
    name: {
      description: 'Name attribute for the file input.',
      control: 'text',
    },
    errorMessage: {
      description: 'Error message to display if there is a validation error.',
      control: 'text',
    },
    defaultValue: {
      description: 'Default value for the file input.',
      control: 'text',
    },
    placeholder: {
      description: 'Placeholder text for the file input.',
      control: 'text',
    },
    loading: {
      description: 'Determines if the file input is in a loading state.',
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<ICFileInput>

export const Default: Story = {
  args: {
    accept: 'image/*',
    label: 'Select an image',
    variant: 'outlined',
    name: 'fileInput',
    errorMessage: '',
    defaultValue: '',
    placeholder: 'Select an image file',
    onChange: (event) => {
      console.log('Selected file:', event.target.files?.[0])
    },
  },
}

export const Loading: Story = {
  args: {
    accept: 'image/*',
    label: 'Select an image',
    variant: 'outlined',
    name: 'fileInput',
    loading: true,
    errorMessage: '',
    defaultValue: '',
    placeholder: 'Select an image file',
    onChange: (event) => {
      console.log('Selected file:', event.target.files?.[0])
    },
  },
}

export const WithError: Story = {
  args: {
    accept: 'image/*',
    label: 'Select an image',
    variant: 'outlined',
    name: 'fileInput',
    errorMessage: 'Please select a valid image file.',
    defaultValue: '',
    placeholder: 'Select an image file',
    onChange: (event) => {
      console.log('Selected file:', event.target.files?.[0])
    },
  },
}

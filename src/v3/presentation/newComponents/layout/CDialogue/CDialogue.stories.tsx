import type { Meta, StoryObj } from '@storybook/react'

import { ModalProvider, useModalContext } from '@/v3/presentation/components/Modal'

import { CDialogue } from './index'

const ModalWrapper = ({ children, args }: any) => {
  const { handleModal } = useModalContext()

  return (
    <>
      <button onClick={() => handleModal(<CDialogue {...args} />)}>Open Modal</button>
      {children}
    </>
  )
}

const meta: Meta<typeof CDialogue> = {
  title: 'layout/CDialogue',
  component: CDialogue,
  decorators: [
    (Story) => (
      <ModalProvider>
        <ModalWrapper>
          <Story />
        </ModalWrapper>
      </ModalProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `CDialogue` component is a customizable modal dialog that allows users to confirm or cancel an action. It provides options for customizing the title, description, and button labels.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onConfirm: {
      action: 'onConfirm',
      description: 'Action triggered when the confirm button is clicked',
    },
    title: { control: 'text', description: 'The title of the modal dialog' },
    description: {
      control: 'text',
      description: 'The description or message displayed in the modal dialog',
    },
    confirmButtonLabel: { control: 'text', description: 'The label for the confirm button' },
    confirmButtonVariant: {
      control: { type: 'select', options: ['contained', 'outlined', 'text'] },
      description: 'The variant of the confirm button',
    },
    cancelButtonLabel: { control: 'text', description: 'The label for the cancel button' },
    cancelButtonVariant: {
      control: { type: 'select', options: ['contained', 'outlined', 'text'] },
      description: 'The variant of the cancel button',
    },
    onClose: { action: 'onClose', description: 'Action triggered when the modal is closed' },
    onCancel: {
      action: 'onCancel',
      description: 'Action triggered when the cancel button is clicked',
    },
  },
}

export default meta

type CDialogueStory = StoryObj<typeof CDialogue>

export const Default: CDialogueStory = {
  args: {
    title: 'Confirm Action',
    description: 'Are you sure you want to proceed with this action?',
  },
}

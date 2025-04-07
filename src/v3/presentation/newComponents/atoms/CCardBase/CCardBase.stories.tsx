import type { Meta, StoryObj } from '@storybook/react'

import { CCardBase } from './index'

const meta: Meta<typeof CCardBase> = {
  title: 'Atoms/CCardBase',
  component: CCardBase,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
    docs: {
      description: {
        component: `The \`CCardBase\` component is a versatile building block for creating card-like elements in your user interface. It provides a clean and modern look with customizable styles and behaviors. The component is built using the Material-UI Stack component, ensuring a consistent and visually appealing appearance.
Regarding its style, the \`CCardBase\` component features rounded corners and a border, giving it a defined and structured look. The background color and padding can be easily customized to suit your design needs.
In terms of behavior, the \`CCardBase\` component can be interactive or non-interactive, depending on your needs. When set to interactive mode, the component responds to user interactions like hover and click events, providing visual feedback through border color and background color changes. This interactivity makes the component suitable for various UI elements, such as cards, tiles, or containers for actionable content.`,
      },
    },
  },
  argTypes: {
    children: {
      description: 'The content to be rendered inside the card.',
      control: 'text',
    },
    isDisabled: {
      description: 'Whether the card should be in a disabled state or not.',
      control: 'boolean',
    },
    isInteractive: {
      description:
        'Whether the card should be interactive, responding to user interactions like hover and click events.',
      control: 'boolean',
    },
    onClick: {
      description: 'A function to be called when the card is clicked (if isInteractive is true).',
      control: null,
    },
    sx: {
      description: 'Additional styles to be applied to the card.',
      control: 'object',
    },
  },
  tags: ['autodocs'],
}

export default meta

type CCardBaseStory = StoryObj<typeof CCardBase>

export const Default: CCardBaseStory = {
  args: {
    sx: { width: 200, height: 200 },
  },
}

export const Interactive: CCardBaseStory = {
  args: {
    isInteractive: true,
    sx: { width: 200, height: 200 },
    onClick: () => alert('Clicked'),
  },
}

export const IsDisabled: CCardBaseStory = {
  args: {
    isDisabled: true,
    sx: { width: 200, height: 200 },
  },
}

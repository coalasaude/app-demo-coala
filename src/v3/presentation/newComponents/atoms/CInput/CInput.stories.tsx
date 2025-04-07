import type { Meta, StoryObj } from '@storybook/react'

import CInput from './index'

const meta: Meta<typeof CInput> = {
  title: 'Atoms/CInput',
  component: CInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'This `CInput` component is an uncontrolled version, ideal for use in forms where the input state does not need to be externally managed by React. It supports input types such as text and password, along with a special variant for monetary values.\n\n### Placeholder and Label Behavior\n- **Dynamic Placeholder**: The inputs placeholder is displayed only when the field is empty ("empty" state) and not focused. This helps to keep the interface clean and focuses the users attention on filling in the necessary data.\n- **Differentiation Between Placeholder and Label**: The "copy" (text) of the placeholder in the empty state may differ from the label when the input field is clicked (focus state). This feature allows for greater flexibility in guiding the user, providing a more detailed guide as a placeholder while maintaining a concise label.\n- **Uncontrolled Component**: Unlike a controllable component, where the inputs value state is managed by React state, this component manages its own state internally, simplifying use in less complex forms or when direct state manipulation is not necessary.\nThis component is versatile and can be adjusted to suit a variety of input needs in forms, while still maintaining a clear and straightforward user experience.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the input field',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input field',
    },
    value: {
      control: 'text',
      description: 'Value for the input field',
    },
    inputType: {
      control: { type: 'select', options: ['text', 'password'] },
      description: 'Type of the input field',
    },
    fullWidth: {
      control: 'boolean',
      description: 'If true, the input field will take up the full width of its container',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the input field will be disabled',
    },
    error: {
      control: 'boolean',
      description: 'If true, the input field will display an error state',
    },
    helperText: {
      control: 'text',
      description: 'Helper text for the input field',
    },
    variant: {
      control: { type: 'select', options: ['outlined', 'standard', 'filled'] },
      description: 'Visual variant of the input field',
    },
    currencyInputProps: {
      control: 'object',
      description: 'Props for currency input',
    },
    InputProps: {
      control: 'object',
      description: 'Props for the input field',
    },
    onChange: {
      action: 'onChange',
      description: 'Function to handle input change',
      control: false,
    },
    onFocus: {
      action: 'onFocus',
      description: 'Function to handle input focus',
      control: false,
    },
    onBlur: {
      action: 'onBlur',
      description: 'Function to handle input blur',
      control: false,
    },
    multiline: {
      control: 'boolean',
      description: 'If true, the input field will be multiline',
    },
    rows: {
      control: 'number',
      description: 'Number of rows for multiline input',
    },
  },
}

export default meta

type Story = StoryObj<typeof CInput>

export const Default: Story = {
  args: {
    placeholder: 'Placeholder',
    label: 'Label',
  },
}

export const PasswordInput: Story = {
  args: {
    ...Default.args,
    inputType: 'password',
  },
}

export const CurrencyInput: Story = {
  args: {
    ...Default.args,
    inputType: 'currency',
  },
}

export const SearchInput: Story = {
  args: {
    ...Default.args,
    inputType: 'search',
  },
}

export const StandardVariant: Story = {
  args: {
    ...Default.args,
    variant: 'standard',
  },
}

export const FilledVariant: Story = {
  args: {
    ...Default.args,
    variant: 'filled',
  },
}

export const WithValue: Story = {
  args: {
    ...Default.args,
    value: 'value',
  },
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
}

export const WithErrorAndHelperText: Story = {
  args: {
    ...Default.args,
    error: true,
    helperText: 'Helper text',
  },
}

export const MultilineInput: Story = {
  args: {
    ...Default.args,
    multiline: true,
    rows: 4,
  },
}

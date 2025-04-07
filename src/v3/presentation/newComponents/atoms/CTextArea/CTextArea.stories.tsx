import type { Meta, StoryObj } from '@storybook/react'

import CTextArea from './index'

const meta: Meta<typeof CTextArea> = {
  title: 'Atoms/CTextArea',
  component: CTextArea,
  parameters: {
    docs: {
      description: {
        component:
          'This `CTextArea` component provides a multiline text input field, built upon the `CInput` foundation. It includes an optional character limit and a helpful character counter for user feedback.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label for the input field' },
    placeholder: { control: 'text', description: 'Placeholder text' },
    limit: { control: 'number', description: 'Maximum allowed characters' },
    rows: { control: 'number', description: 'Number of rows for multiline input' },
    maxRows: {
      control: 'number',
      description:
        'Maximum number of lines that input will reach, it will change automatically, if used with the `row` prop IT WILL NOT WORK',
    },
    minRows: {
      control: 'number',
      description:
        'Minimum number of lines that input starts, if used with the `row` prop IT WILL NOT WORK',
    },
  },
}

export default meta

type TextAreaStory = StoryObj<typeof CTextArea>

export const Default: TextAreaStory = {
  args: {
    placeholder: 'Enter your comment here...',
    label: 'Comment',
    limit: 100,
  },
}

export const With10Limit: TextAreaStory = {
  args: {
    placeholder: 'Enter your comment here...',
    label: 'Comment',
    limit: 10,
  },
}

export const With10Rows: TextAreaStory = {
  args: {
    placeholder: 'Enter your comment here...',
    label: 'Comment',
    rows: 10,
  },
}

export const With10MaxRows: TextAreaStory = {
  args: {
    placeholder: 'Enter your comment here...',
    label: 'Comment',
    maxRows: 10,
  },
}

export const With5MinRows: TextAreaStory = {
  args: {
    placeholder: 'Enter your comment here...',
    label: 'Comment',
    minRows: 5,
  },
}

export const With5MinRowsAndMaxRows15: TextAreaStory = {
  args: {
    placeholder: 'Enter your comment here...',
    label: 'Comment',
    minRows: 5,
    maxRows: 15,
  },
}

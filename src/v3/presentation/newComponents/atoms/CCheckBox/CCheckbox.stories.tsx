import type { Meta, StoryObj } from '@storybook/react'

import CCheckbox from './index'

const meta: Meta<typeof CCheckbox> = {
  title: 'Atoms/CCheckbox',
  component: CCheckbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `CCheckbox` component provides a customizable way to display small, interactive checkboxes. It builds upon the Material UI Checkbox component, offering additional functionality and styles.\n\nFeatures:\n\nError state: The error prop allows you to display the checkbox in an error state, with a red border and background.\n\nCustomizable styles: The CCheckbox component provides additional styling options beyond those offered by the Material UI Checkbox component. You can customize the following:\n\nError color: The color of the checkbox in the error state can be customized using the errorColor prop.\n\nHover color: The background color of the checkbox on hover can be customized using the hoverColor prop.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    haveError: {
      control: 'boolean',
      description: 'Determines whether or not the checkbox will show the error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Determines whether or not the checkbox will be disabled',
    },
  },
}

export default meta

type CCheckboxStory = StoryObj<typeof CCheckbox>

export const Default: CCheckboxStory = {}

export const Disabled: CCheckboxStory = {
  args: {
    disabled: true,
  },
}

export const WithError: CCheckboxStory = {
  args: {
    haveError: true,
  },
}

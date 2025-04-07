import type { Meta, StoryObj } from '@storybook/react'

import { Experimental_CInformation } from './Experimental_CInformation'

const meta: Meta<typeof Experimental_CInformation> = {
  title: 'Molecules/Experimental_CInformation',
  component: Experimental_CInformation,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `Experimental_CInformation` component is used to display information to the user. On hover, the information is displayed in a tooltip.',
      },
    },
  },
  argTypes: {
    title: {
      description: 'The title of the information.',
      control: 'text',
    },
    description: {
      description: 'The description of the information.',
      control: 'text',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Experimental_CInformation>

export const Default: Story = {
  args: {
    title: 'Information',
    description: 'This is a description',
  },
}

export const OnlyTitle: Story = {
  storyName: 'Only title',
  args: {
    title: 'Information',
  },
}

export const AlternativeColor: Story = {
  storyName: 'Alternative title',
  args: {
    title: 'Information',
    description: 'This is a description',
    color: 'var(--mui-palette-primary-main)',
  },
}

import type { Meta, StoryObj } from '@storybook/react'
import { CorporateFare } from '@mui/icons-material'

import { SchemaTypeEnum } from '../../../enums/schema-types.enum'

import { CStatus } from './CStatus'

const meta: Meta<typeof CStatus> = {
  title: 'Molecules/StatusLabel',
  component: CStatus,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A status label component that displays a status text with a color indicator.',
      },
    },
  },
  argTypes: {
    type: {
      description: 'A enum referring to the status type',
      control: SchemaTypeEnum,
      table: {
        type: { summary: Object.values(SchemaTypeEnum).join(' | ') },
      },
    },
    label: {
      description: 'A string referring to the status text',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CStatus>

export const Default: Story = {
  args: {
    type: SchemaTypeEnum.SUCCESS,
    label: 'Status',
  },
}

export const Icon: Story = {
  args: {
    label: 'Status',
    IconComponent: CorporateFare,
    variant: 'icon',
  },
}

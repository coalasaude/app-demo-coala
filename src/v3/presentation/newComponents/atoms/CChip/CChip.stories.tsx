import type { Meta, StoryObj } from '@storybook/react'

import CChip from './index'

const meta: Meta<typeof CChip> = {
  title: 'Atoms/CChip',
  component: CChip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `CChip` component provides a customizable way to display small, interactive tags or labels. It builds upon the Material UI Chip component, offering control over variant and size.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select', options: ['outlined', 'filled'] },
      description: 'Visual appearance of the chip',
    },
    size: {
      control: { type: 'select', options: ['small', 'medium'] },
      description: 'Size of the chip',
    },
    deletable: {
      control: 'boolean',
      description: 'Determines whether or not the chip will show the delete button',
    },
    label: { control: 'text', description: 'The text label within the chip' },
    onDelete: { action: 'onDelete', description: 'Action triggered on delete (if applicable)' },
    onClick: { action: 'onClick', description: 'Action triggered on click (if applicable)' },
    typographyProps: {
      control: 'object',
      description: 'Props to pass to the Typography component within the chip',
    },
  },
}

export default meta

type CChipStory = StoryObj<typeof CChip>

export const Default: CChipStory = {
  args: {
    label: 'Chip',
    variant: 'outlined',
    size: 'medium',
  },
}

export const Disabled: CChipStory = {
  args: {
    label: 'Chip',
    variant: 'outlined',
    size: 'medium',
    disabled: true,
  },
}

export const OutlinedSmall: CChipStory = {
  args: {
    label: 'Chip',
    variant: 'outlined',
    size: 'small',
  },
}

export const OutlinedMedium: CChipStory = {
  args: {
    label: 'Chip',
    variant: 'outlined',
    size: 'medium',
  },
}

export const FilledMedium: CChipStory = {
  args: {
    label: 'Chip',
    variant: 'filled',
    size: 'medium',
  },
}

export const FilledSmall: CChipStory = {
  args: {
    label: 'Chip',
    variant: 'filled',
    size: 'small',
  },
}

export const OnDeleteOutlinedSmall: CChipStory = {
  args: {
    label: 'Chip',
    variant: 'outlined',
    size: 'small',
    deletable: true,
    onDelete: () => {
      alert('onDelete')
    },
  },
}

export const OnDeleteFilledSmall: CChipStory = {
  args: {
    label: 'Chip',
    variant: 'filled',
    size: 'small',
    deletable: true,
    onDelete: () => {
      alert('onDelete')
    },
  },
}

export const OnClick: CChipStory = {
  args: {
    label: 'Chip',
    variant: 'outlined',
    size: 'medium',
    onClick: () => {
      alert('onClick')
    },
  },
}

export const OnClickAndOnDelete: CChipStory = {
  args: {
    label: 'Chip',
    deletable: true,
    variant: 'outlined',
    size: 'medium',
    onDelete: () => {
      alert('onDelete')
    },
    onClick: () => {
      alert('onClick')
    },
  },
}

export const TypographyProps: CChipStory = {
  args: {
    label: 'Chip',
    deletable: true,
    variant: 'outlined',
    size: 'medium',
    typographyProps: {
      color: 'red',
    },
    onDelete: () => {
      alert('onDelete')
    },
    onClick: () => {
      alert('onClick')
    },
  },
}

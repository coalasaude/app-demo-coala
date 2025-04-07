import type { Meta, StoryObj } from '@storybook/react'
import { Box } from '@mui/material'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'

import { CDivider, CDividerProps } from './index'

const meta: Meta<CDividerProps> = {
  title: 'Atoms/CDivider',
  component: CDivider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The `CDivider` component is a customizable divider that can be used to separate content. It extends the functionality of the Material-UI Divider component and adds additional styling options.\n\nThe component allows you to customize the appearance of the divider by specifying whether it should have a dashed or solid border. You can also control the orientation (horizontal or vertical) and the variant (fullWidth or inset) of the divider. Additionally, the component supports the flexItem prop to adjust its behavior within flex containers.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isDashed: {
      description: 'Specifies whether the divider should have a dashed border.',
      control: 'boolean',
    },
    orientation: {
      description: 'The orientation of the divider (horizontal or vertical).',
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      description: 'The variant to use (fullWidth or inset).',
      control: 'radio',
      options: ['fullWidth', 'inset', 'middle'],
    },
    flexItem: {
      description: 'If true, the divider will adapt to a parent flex container.',
      control: 'boolean',
    },
    sx: {
      description:
        'The system prop that allows defining system overrides as well as additional CSS styles.',
      control: 'object',
    },
  },
}

export default meta

type CDividerStory = StoryObj<CDividerProps>

export const Default: CDividerStory = {}

export const HorizontalDashed: CDividerStory = {
  args: {
    isDashed: true,
  },
}

export const Vertical: CDividerStory = {
  decorators: [
    (Story) => (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          bgcolor: 'background.paper',
          color: 'text.secondary',
          justifyContent: 'center',
          '& svg': {
            m: 1,
          },
        }}
      >
        <FormatBoldIcon />
        <Story flexItem />
        <FormatItalicIcon />
      </Box>
    ),
  ],
  args: {
    orientation: 'vertical',
    variant: 'fullWidth',
    flexItem: true,
    isDashed: true,
  },
}

export const VerticalDashed: CDividerStory = {
  decorators: [
    (Story) => (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid',
          justifyContent: 'center',
          borderColor: 'divider',
          borderRadius: 2,
          bgcolor: 'background.paper',
          color: 'text.secondary',
          '& svg': {
            m: 1,
          },
        }}
      >
        <FormatBoldIcon />
        <Story />
        <FormatItalicIcon />
      </Box>
    ),
  ],
  args: {
    orientation: 'vertical',
    variant: 'fullWidth',
    flexItem: true,
    isDashed: true,
  },
}

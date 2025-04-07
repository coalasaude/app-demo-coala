import type { Meta, StoryObj } from '@storybook/react'
import { Button, Stack, Typography } from '@mui/material'
import { WhatsApp } from '@mui/icons-material'

import PlaygroundIllustration from '../../../../../../public/assets/svg/playground.svg'

import { Experimental_CVerticalModal } from './Experimental_CVerticalModal'

const meta: Meta<typeof Experimental_CVerticalModal> = {
  title: 'Layout/Experimental_CVerticalModal',
  component: Experimental_CVerticalModal,

  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Experimental_CVerticalModal is a small modal that can be used to display a title, subtitle, illustration, and two buttons in a column layout.',
      },
    },
  },
  argTypes: {
    title: {
      description: 'The title to display in the modal.',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    subtitle: {
      description: 'The subtitle to display in the modal.',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    illustration: {
      description: 'The illustration to display in the modal.',
      control: 'none',
    },
    primaryButton: {
      description: 'The primary button to display in the modal.',
      control: 'object',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    primaryButtonLabel: {
      description: 'The label to display on the primary button.',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    onPrimaryButtonClick: {
      description: 'The function to call when the primary button is clicked.',
      action: 'clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
    secondaryButton: {
      description: 'The secondary button to display in the modal.',
      control: 'object',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    secondaryButtonLabel: {
      description: 'The label to display on the secondary button.',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    onSecondaryButtonClick: {
      description: 'The function to call when the secondary button is clicked.',
      action: 'clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Experimental_CVerticalModal>

export const Default: Story = {
  args: {
    title: 'Lorem ipsum dolor sit amet',
    subtitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
    primaryButtonLabel: 'Primary',
    secondaryButtonLabel: 'Secondary',
    illustration: <PlaygroundIllustration />,
  },
}

export const WithoutSubtitle: Story = {
  args: {
    title: (
      <Typography variant='h1'>
        Example with a custom{' '}
        <Typography variant='h1' component='span' color={(theme) => theme.palette.primary.main}>
          typography component
        </Typography>
      </Typography>
    ),
    primaryButtonLabel: 'Yes :)',
    secondaryButtonLabel: 'No',
    illustration: <PlaygroundIllustration />,
  },
}

export const CustomButton: Story = {
  args: {
    title: 'You can customize the buttons',
    subtitle: 'You can pass any React component as a button.',
    primaryButton: (
      <Button variant='contained' sx={{ bgcolor: '#118578' }}>
        <Stack direction='row' gap={1}>
          <WhatsApp />
          WhatsApp
        </Stack>
      </Button>
    ),
    secondaryButtonLabel: 'Close',
    illustration: <PlaygroundIllustration />,
  },
}

export const WithoutIllustration: Story = {
  args: {
    title: 'You can use the default values for buttons and no illustration',
    subtitle: 'You can pass no illustration and use the default buttons.',
  },
}

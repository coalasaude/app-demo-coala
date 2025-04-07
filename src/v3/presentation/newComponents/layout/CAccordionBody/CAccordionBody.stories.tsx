import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Box, Button } from '@mui/material'

import { CAccordionBody, CAccordionBodyProps } from './CAccordionBody'

const meta: Meta<CAccordionBodyProps> = {
  title: 'Components/CAccordionBody',
  component: CAccordionBody,
  parameters: {
    docs: {
      description: {
        component:
          'The `CAccordionBody` is a custom component that represents the content area of an accordion. It provides a structured layout for displaying content, along with optional primary and secondary buttons. The component also supports a loading state for the secondary button.\n\n**Features:**\n- **Content Area:** Displays the main content of the accordion body.\n- **Primary Button:** Allows for an optional primary button to be displayed on the right side of the content area.\n- **Secondary Button:** Allows for an optional secondary button to be displayed on the left side of the content area.\n- **Loading State:** Supports a loading state for the secondary button, displaying a circular progress indicator.\n\n**Recommended Use:**\nIdeal for displaying the content of an accordion, with the flexibility to include primary and secondary actions. The loading state of the secondary button can be used to indicate ongoing processes or data fetching.',
      },
    },
  },
  argTypes: {
    children: {
      description: 'The main content of the accordion body.',
      defaultValue: 'Content of the accordion body goes here (Children)',
    },
    primaryButton: {
      description: 'Optional primary button displayed on the right side of the content area.',
      control: 'node',
    },
    secondaryButton: {
      description: 'Optional secondary button displayed on the left side of the content area.',
      control: 'node',
    },
    loadingSecondaryButton: {
      description: 'Controls whether the secondary button is in a loading state.',
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<CAccordionBodyProps>

export const Default: Story = {
  args: {
    children: <Box p={1}>Content of the accordion body goes here (Children)</Box>,
  },
}

export const WithButtons: Story = {
  args: {
    children: <Box p={1}>Content of the accordion body goes here (Children)</Box>,
    primaryButton: <Button variant='contained'>Primary</Button>,
    secondaryButton: <Button variant='outlined'>Secondary</Button>,
  },
}

export const WithLoadingSecondaryButton: Story = {
  args: {
    children: <Box p={1}>Content of the accordion body goes here (Children)</Box>,
    primaryButton: <Button variant='contained'>Primary</Button>,
    secondaryButton: <Button variant='outlined'>Secondary</Button>,
    loadingSecondaryButton: true,
  },
}

import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Typography } from '@mui/material'

import { CStepper, CStepperProps } from './CStepper'

const meta: Meta<CStepperProps<number>> = {
  title: 'Layout/CStepper',
  component: CStepper,
  parameters: {
    docs: {
      description: {
        component:
          'CStepper is a customizable stepper component that allows navigation through a series of steps.',
      },
    },
  },
  argTypes: {
    steps: {
      description: 'Array of strings representing the labels for each step.',
      control: 'array',
    },
    optionalsLabels: {
      description: 'Array of strings representing the optional labels for each step.',
      control: 'array',
    },
    activeStep: {
      description: 'The currently active step.',
      control: 'number',
    },
    renderHeader: {
      description: 'Function that returns a React node to be rendered as the header.',
      control: 'function',
    },
    children: {
      description: 'Array of React elements representing the content for each step.',
      control: 'array',
    },
    boxProps: {
      description: 'Additional props to be passed to the Box component.',
      control: 'object',
    },
    noPadding: {
      description: 'Indicates whether to remove padding from the stepper.',
      control: 'boolean',
    },
    isStepError: {
      description: 'Function that determines if a step should be marked as an error.',
      control: 'function',
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<CStepperProps<number>> = {
  args: {
    steps: ['Step 1', 'Step 2', 'Step 3'],
    activeStep: 0,
  },
}

export const WithOptionalLabels: StoryObj<CStepperProps<number>> = {
  args: {
    steps: ['Step 1', 'Step 2', 'Step 3'],
    optionalsLabels: ['Optional Label 1', 'Optional Label 2', 'Optional Label 3'],
    activeStep: 1,
  },
}

export const WithHeader: StoryObj<CStepperProps<number>> = {
  args: {
    steps: ['Step 1', 'Step 2', 'Step 3'],
    activeStep: 2,
    renderHeader: () => <Typography variant='h4'>Stepper Header</Typography>,
  },
}

export const WithError: StoryObj<CStepperProps<number>> = {
  args: {
    steps: ['Step 1', 'Step 2', 'Step 3'],
    activeStep: 2,
    renderHeader: () => <Typography variant='h4'>Stepper Header</Typography>,
    isStepError: (label, index) => index === 1,
  },
}

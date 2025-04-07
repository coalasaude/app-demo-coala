import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { HealthAndSafety } from '@mui/icons-material'

import { CAccordion, CAccordionProps } from './CAccordion'

const meta: Meta<CAccordionProps> = {
  title: 'Components/CAccordion',
  component: CAccordion,
  parameters: {
    docs: {
      description: {
        component:
          'The `CAccordion` is a custom accordion component that elegantly displays collapsible content panels. It is styled with a clean and modern look, featuring a customizable icon, title, and subtitle. The accordion expands to reveal its content, offering an interactive and space-efficient way to present information.\n\n**Features:**\n- **Custom Icon:** Supports the inclusion of a custom icon on the left side of the summary area.\n- **Title and Subtitle:** Allows for a title and an optional subtitle, providing clear and concise information.\n- **Expandable Content:** Reveals additional content when expanded, with a smooth animation.\n- **Styling:** Styled with a subtle border, rounded corners, and custom padding to align with modern design aesthetics.\n\n**Recommended Use:**\nIdeal for FAQs, content organization, or any situation where space efficiency is important and content needs to be presented in a structured and accessible manner.',
      },
    },
  },
  argTypes: {
    icon: {
      description: 'Custom icon displayed on the accordion.',
    },
    title: {
      description: 'The title of the accordion.',
      control: 'text',
    },
    subtitle: {
      description: 'Optional subtitle displayed under the title.',
      control: 'text',
    },
    children: {
      description: 'The content displayed when the accordion is expanded.',
      defaultValue: 'Content of the accordion goes here (Children)',
    },
    expanded: {
      description: 'Controls the expanded state of the accordion.',
      control: 'boolean',
    },
    defaultExpanded: {
      description: 'Controls the default expanded state of the accordion.',
      control: 'boolean',
    },
    onChange: {
      description: 'Function called when the accordion expands or collapses.',
      control: 'function',
    },
    withDivider: {
      description: 'Controls whether a divider is displayed between the summary and the content.',
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<CAccordionProps>

export const Default: Story = {
  args: {
    title: 'Accordion Title',
    subtitle: 'Subtitle',
    children: 'Content of the accordion goes here (Children)',
    expanded: false,
    withDivider: true,
    onChange: () => {
      alert('onChange')
    },
  },
}

export const CAccordionWithIcon: Story = {
  args: {
    title: 'Accordion Title',
    icon: <HealthAndSafety />,
    subtitle: 'Subtitle',
    children: 'Content of the accordion goes here (Children)',
    expanded: false,
    onChange: () => {
      alert('onChange')
    },
  },
}

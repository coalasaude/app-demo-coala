import React from 'react'
import { Meta, StoryObj } from '@storybook/react'

import { CAccordion } from '../CAccordion/CAccordion'

import { CAccordionList, CAccordionListProps } from './CAccordionList'

const meta: Meta<CAccordionListProps<any>> = {
  title: 'Components/CAccordionList',
  component: CAccordionList,
  parameters: {
    docs: {
      description: {
        component:
          "The `CAccordionList` component is specifically designed for listing and arranging `CAccordions`. It leverages a responsive grid layout to display a collection of accordions, each individually configured through an array of props. The component dynamically renders each accordion using the `options` prop, which is an array of objects where each object's properties are directly passed as props to the `CAccordion`.\n\n**Features:**\n- **Responsive Grid Layout:** Adaptable column configurations for different screen sizes.\n- **Dynamic Rendering:** Employs a `renderItem` function, spreading each item's properties into `CAccordion` props for customized accordion rendering.\n- **Customizable Accordions:** Extensive customization for each accordion enabled by passing individual properties in the `options` array.\n\n**Recommended Use:**\nThis component excels in scenarios where multiple accordions need structured and organized presentation, such as in FAQs, detailed product descriptions, or content grouping.",
      },
    },
  },
  argTypes: {
    numColumnsDesktop: {
      description: 'Specifies the number of columns in the grid layout for desktop view.',
      control: 'number',
    },
    numColumnsMobile: {
      description: 'Determines the number of columns in the grid layout for mobile view.',
      control: 'number',
    },
    options: {
      description:
        'An array of objects, each representing properties for an individual accordion. These properties are spread as props to each `CAccordion` rendered.',
      control: 'object',
    },
    renderItem: {
      description:
        'A function that renders each accordion. It takes an object from the `options` array and returns a `CAccordion` component, with object properties spread as props.',
      control: 'function',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<CAccordionListProps<any>>

export const Default: Story = {
  args: {
    numColumnsDesktop: 1,
    numColumnsMobile: 1,
    options: [
      {
        id: 1,
        children: 'Content for first accordion',
        title: 'Title for first accordion',
      },
      {
        id: 2,
        children: 'Content for second accordion',
        title: 'Title for second accordion',
      },
    ],
    renderItem: (item) => <CAccordion {...item} key={item.id} />,
  },
}

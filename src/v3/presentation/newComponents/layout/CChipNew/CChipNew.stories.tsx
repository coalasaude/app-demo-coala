import type { Meta, StoryObj } from '@storybook/react'

import { CChipNew } from './CChipNew'

const meta: Meta<typeof CChipNew> = {
  title: 'Components/CChipNew',
  component: CChipNew,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
  **CChipNew: Highlight New Items**

  _Description:_
  - **Purpose:** The CChipNew component is designed to highlight new or recently added items in your application. Positioned absolutely, this small but noticeable element grabs the user's attention by displaying a "NEW" label.
    
  - **Animation:** It features a subtle color change animation that alternates the text color between white and black, making it stand out even more.

  _Style Features:_
  - **Positioning:** The CChipNew is absolutely positioned at the top-right corner of its container, making it easy to apply over any component.
  
  - **Font and Size:** The component has a small font size of 8px, ensuring it is not overly intrusive while still being noticeable.
    
  - **Background and Border:** It has a background color set to the secondary color of the theme and a slight border radius for a rounded look.
  
  - **Responsiveness:** Despite its small size, the component is flexible, adapting to various screen sizes without losing its effectiveness.
  
  _Use Case:_
  - Ideal for use in product lists, feature highlights, or anywhere you need to indicate that something is new or has been updated recently.`,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CChipNew>

export const Default: Story = {
  args: {
    sx: {
      top: '6px',
      right: '2px',
      zIndex: 1,
    },
  },
}

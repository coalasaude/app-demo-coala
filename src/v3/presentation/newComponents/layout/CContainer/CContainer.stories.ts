import type { Meta, StoryObj } from '@storybook/react'

import CContainer from '.'

const meta: Meta<typeof CContainer> = {
  title: 'Layout/CContainer',
  component: CContainer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
  **CContainer: The Core Layout Component**
  
  _Description:_
  - **Purpose:** The CContainer is a central layout component designed to wrap around the entire content of an application. It serves as the foundational block for the app's layout, ensuring that all content is properly aligned and presented.
    
  - **Responsive Design:** This container is fully responsive. It adjusts its padding and layout to accommodate various screen sizes, ensuring a seamless user experience across different devices.
  
  _Style Features:_
  - **Padding:** The CContainer has a default padding of 6 theme spacing units on all sides. On smaller screens, it reduces the padding to 4 theme spacing units on the top and bottom and 1.5 on the sides.
    
  - **Top Padding Adjustment:** The top padding is dynamically calculated to accommodate the navigation bar's height, ensuring the content is always positioned appropriately.
  
  - **Background:** It uses the theme's default background color, providing a consistent look and feel across the application.
  
  - **Width and Centering:** The container has a maximum width of 1550px and is automatically centered. This ensures the content is not stretched too wide on larger screens, aiding in readability and visual appeal.
  
  - **Z-Index:** The z-index is set to 1600, ensuring that the container and its content layer correctly with other UI elements.
  
  _Adaptive Features:_
  - **Mobile Adaptation:** On mobile devices, the container shifts to a columnar layout, with special consideration for padding at the bottom to account for additional navigation or action elements.
    
  - **Overflow Management:** The container is set to hide any overflow along the x-axis, preventing unwanted horizontal scrolling on smaller screens.
  
  _Use Case:_
  - Ideal for applications needing a consistent, responsive, and aesthetically pleasing layout structure. The CContainer simplifies the development process by providing a ready-to-use, adaptable container for various content types and design requirements.`,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CContainer>

export const Default: Story = {}

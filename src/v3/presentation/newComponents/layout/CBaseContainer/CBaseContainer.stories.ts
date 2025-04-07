import type { Meta, StoryObj } from '@storybook/react'

import { CBaseContainer } from './CBaseContainer'

const meta: Meta<typeof CBaseContainer> = {
  title: 'Layout/CBaseContainer',
  component: CBaseContainer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "The `CBaseContainer` is a versatile component used in the majority of the application's pages. It is essential for creating a consistent and pleasant user experience across various interfaces. \n\n**Features:**\n- **Stylized Background:** The component incorporates a `paper` element as its background, offering a sleek and clean visual appeal.\n- **Integration with Other Components:** It utilizes key components like `ContentWrapper`, `NavbarActions`, and `FormButton` to provide a complete and interactive user experience.\n- **Main Customization Through Props:** \n  - **Title:** Allows for the inclusion of a title at the top of the container, adding context and clarity for the user.\n  - **Divider and Buttons:** At the bottom, the component can include a divider and buttons, providing clearly defined action options.\n- **Mobile Responsiveness:** On mobile devices, the buttons are fixed at the bottom of the screen thanks to the `NavbarActions` component, enhancing accessibility and usability on smaller screens.\n\n**Recommended Use:**\nThe CBaseContainer is typically used beneath the PageHeader, serving as a high-level component in the application's architecture. Its primary function is to organize the entire content container of the page, providing a structured and coherent layout for presenting various elements. This positioning and functionality make it an integral part of the page layout, ensuring a seamless flow from the page header to the main content.",
      },
    },
  },
  argTypes: {
    title: {
      description: 'A string referring to the container title, Typography of variant h4',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    buttonLabel: {
      description: 'A string representing the label of the main button located at the bottom',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    cancelLabel: {
      description: 'A string representing the label of the secondary button located at the bottom',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      description:
        'A React node representing the content that will be rendered in the middle of the container',
      control: 'ReactNode',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    infoTitle: {
      description: 'A React node acting as an informative element, located at the top right',
      control: 'ReactNode',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    onConfirm: {
      description: 'Function that is called when the main button is clicked',
      control: 'function',
    },
    onCancel: {
      description: 'Function that is called when the secondary button is clicked',
      control: 'function',
    },
    withContentPadding: {
      description: 'A boolean that indicates whether the content should have padding',
      control: 'boolean',
      table: {
        type: { summary: 'boolean', defaultValue: { summary: 'true' } },
      },
    },
  },

  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CBaseContainer>

export const Default: Story = {
  args: {
    title: 'Title',
    buttonLabel: 'buttonLabel',
    children: 'content goes here',
    cancelLabel: 'cancelLabel',
    infoTitle: 'infoTitle',
    onConfirm: () => alert('onClick'),
    onCancel: () => alert('onCancel'),
  },
}

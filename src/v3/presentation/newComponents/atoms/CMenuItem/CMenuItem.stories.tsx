import type { Meta, StoryObj } from '@storybook/react'

import { CMenuItem } from './index'

const meta: Meta<typeof CMenuItem> = {
  title: 'Atoms/CMenuItem',
  component: CMenuItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '`CMenuItem` is a component that extends Material-UIs `MenuItem`, applying custom styling to ensure consistency throughout the design system. It allows for detailed customization of individual menu items within menu components, providing a familiar interface for developers while offering the necessary design adjustment flexibility.\n\n- **Customization**: Supports all `MenuItemProps` from Material-UI, allowing full control over the appearance and behavior of each menu item.\n\n- **Responsive**: Adjusts font size for smaller devices, ensuring menu content remains legible across all screen resolutions.\n\n- **Flexible**: Can be used within any Material-UI menu component, providing an easy way to maintain visual consistency across all menus.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'The content of the menu item, typically text.',
      control: 'text',
    },
    onClick: {
      description: 'Function called when the menu item is clicked.',
      action: 'onClick',
    },
  },
}

export default meta

type CMenuItemStory = StoryObj<typeof CMenuItem>

export const Default: CMenuItemStory = {
  args: {
    children: 'Menu Item',
    onClick: () => alert('Menu Item Clicked'),
  },
}

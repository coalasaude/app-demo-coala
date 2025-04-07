import type { Meta, StoryObj } from '@storybook/react'
import { Box, Button } from '@mui/material'
import { PersonOutlined } from '@mui/icons-material'

import { CMenu } from './index'

const meta: Meta<typeof CMenu> = {
  title: 'Atoms/CMenu',
  component: CMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `CMenu` component provides a customizable and reusable menu solution built on top of Material-UI components. It offers the following benefits:\n\n-   Simplified Integration: Designed to easily integrate with a variety of action components (buttons, icons, etc.) to trigger the menus display.\n\n-   Customization: Supports the full range of `MenuItemProps` from Material-UI, allowing for complete control over the appearance and behavior of individual menu items.\n\n-   Flexibility: Accepts an array of `MenuItemProps`, enabling the dynamic creation of menus with any number of items.\n\n-   Atomized: Leverages the `CMenuItem` atom component (a custom wrapper around Material UIs `MenuItem`) for consistency and potential styling customization.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    actionComponent: {
      description:
        'The actionComponent prop defines the element that will be used to open the menu. It can be any valid React component, such as a button, icon, or text.',
    },
    items: {
      description:
        'The items prop defines the menu items that will be displayed when the menu is opened. It should be an array of `MenuItemProps` objects, which are used to define the appearance and behavior of each menu item. The LENGTH OF THE ARRAY MUST BE AT LEAST 2 ITEMS. The first item will be the actionComponent, and the rest will be the menu items.',
    },
  },
}

export default meta

type CMenuStory = StoryObj<typeof CMenu>

export const Default: CMenuStory = {
  args: {
    actionComponent: <Button>ActionComponent</Button>,
    items: [
      { onClick: () => alert('Item 1 click'), children: 'Item 1' },
      { onClick: () => alert('Item 2 click'), children: 'Item 2' },
    ],
  },
}

export const WithDisabledItems: CMenuStory = {
  args: {
    actionComponent: <Button>ActionComponent</Button>,
    items: [
      { onClick: () => alert('Item 1 click'), children: 'Item 1', disabled: true },
      { onClick: () => alert('Item 2 click'), children: 'Item 2', disabled: true },
    ],
  },
}

export const WithSelectedItem: CMenuStory = {
  args: {
    actionComponent: <Button>ActionComponent</Button>,
    items: [
      { onClick: () => alert('Item 1 click'), children: 'Item 1', selected: true },
      { onClick: () => alert('Item 2 click'), children: 'Item 2' },
    ],
  },
}

export const ItemsWithIcons: CMenuStory = {
  args: {
    actionComponent: <Button>ActionComponent</Button>,
    items: [
      {
        onClick: () => alert('Item 1 click'),
        children: (
          <Box>
            <PersonOutlined sx={{ marginRight: 1 }} />
            Item 1
          </Box>
        ),
      },
      {
        onClick: () => alert('Item 2 click'),
        children: (
          <Box>
            <PersonOutlined sx={{ marginRight: 1 }} />
            Item 2
          </Box>
        ),
      },
    ],
  },
}

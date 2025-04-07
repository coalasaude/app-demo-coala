import type { Meta, StoryObj } from '@storybook/react'
import { HealthAndSafety } from '@mui/icons-material'

import { CContainerContent, ICContainerContentProps } from './CContainerContent'

const meta: Meta<ICContainerContentProps> = {
  title: 'Components/CContainerContent',
  component: CContainerContent,
  parameters: {
    docs: {
      description: {
        component:
          "The `CContainerContent` is a versatile container component used for presenting information in a clear and organized manner. It supports titles, subtitles, icons, and custom components, making it ideal for a wide range of uses.\n\n**Features:**\n- **Visual Style:** Features a clean and modern design with a prominent 2px solid border in `var(--mui-palette-grey-200)` color. The container has a `borderRadius` of 8px, providing a smooth and rounded appearance.\n- **Title and Subtitle:** Includes options for a title and subtitle, providing context.\n- **Icon and Actions:** Supports a clickable icon and a custom component at the end of the container.\n- **Start and End Component:** Allows adding custom components at the beginning and end of the container's layout.\n- **Click and Hover:** Options for clicking the entire container and hover effect for interactivity.\n- **Loading State:** Supports a loading state, displaying a `CircularProgress`.\n- **Customization with SX:** Allows for custom styles with the `sx` property.\n\n**Recommended Use:**\nIdeal for concisely presenting sets of information, such as on dashboards or item lists. The flexible design allows it to adapt to different contexts within an application.",
      },
    },
  },
  argTypes: {
    children: {
      description: 'The main content of the container, can be any ReactNode.',
      control: 'ReactNode',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    title: {
      description: 'The container title, string.',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    subtitle: {
      description: 'The container subtitle, can be a ReactNode.',
      control: 'text',
    },
    icon: {
      description: 'Icon to be displayed on the container, ReactNode.',
      control: 'ReactNode',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    onClickIcon: {
      description: 'Function called when the icon is clicked.',
      control: 'function',
    },
    hover: {
      description: 'If true, adds a hover effect to the container.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
    },
    isLoading: {
      description: 'If true, displays a loading indicator.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
    },
    startComponent: {
      description: 'Custom component to be displayed at the beginning of the container layout.',
      control: 'ReactNode',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    endComponent: {
      description: 'Custom component to be displayed at the end of the container layout.',
      control: 'ReactNode',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    sx: {
      description: 'Style object for further customization of the container.',
      control: 'object',
      table: {
        type: { summary: 'any' },
      },
    },
    onClick: {
      description: 'Function called when the container is clicked.',
      control: 'function',
    },
    withDivider: {
      description: 'Controls whether a divider is displayed between the summary and the content.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
    },
    titleProps: {
      description: 'Props for the title component.',
      control: 'object',
      table: {
        type: { summary: 'any' },
      },
    },
  },

  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CContainerContent>

export const Default: Story = {
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    hover: true,
    withDivider: true,
    onClick: () => alert('container Click'),
    children: 'Content goes here',
  },
}

export const WithAllProps: Story = {
  args: {
    children: 'content',
    title: 'Title',
    subtitle: 'Subtitle',
    icon: 'Icon',
    onClickIcon: () => alert('Icon Click'),
    withDivider: true,
    hover: true,
    isLoading: false,
    startComponent: 'StartComponent',
    endComponent: 'EndComponent',
    onClick: () => alert('container Click'),
  },
}

export const CcontainerBasicWithStartComponent: Story = {
  args: {
    title: 'Title',
    startComponent: <HealthAndSafety />,
    subtitle: 'Subtitle',
    hover: true,
    onClick: () => alert('container Click'),
    children: 'Content goes here',
    withDivider: true,
  },
}

export const CcontainerBasicWithEndComponent: Story = {
  args: {
    title: 'Title',
    endComponent: <HealthAndSafety />,
    subtitle: 'Subtitle',
    hover: true,
    onClick: () => alert('container Click'),
    children: 'Content goes here',
    withDivider: true,
  },
}

export const CcontainerBasicWithIcon: Story = {
  args: {
    title: 'Title',
    icon: <HealthAndSafety />,
    subtitle: 'Subtitle',
    hover: true,
    onClick: () => alert('container Click'),
    children: 'Content goes here',
    withDivider: true,
  },
}

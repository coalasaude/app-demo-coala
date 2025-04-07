import type { Meta, StoryObj } from '@storybook/react'
import { Box, Typography } from '@mui/material'

import { CTabs } from './index'

const meta: Meta<typeof CTabs> = {
  title: 'layout/CTabs',
  component: CTabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `CTabs` component is a customizable tab component that allows users to switch between different content sections. It provides options for customizing the tab names and corresponding content. The selected tab is synchronized with the URL query parameter, allowing for deep linking and navigation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    tabsNames: { control: 'array', description: 'The names of the tabs' },
    tabsBody: { control: 'array', description: 'The content corresponding to each tab' },
    isLoading: {
      control: 'boolean',
      description: 'Determines if the component is in a loading state',
    },
  },
}

export default meta

type CTabsStory = StoryObj<typeof CTabs>

const TabContent = ({ label }: any) => (
  <Box p={2}>
    <Typography variant='h6'>{label}</Typography>
    <Typography>This is the content for {label}.</Typography>
  </Box>
)

export const Default: CTabsStory = {
  args: {
    tabsNames: ['Tab 1', 'Tab 2', 'Tab 3'],
    tabsBody: [
      <TabContent key={Math.random()} label='Tab 1' />,
      <TabContent key={Math.random()} label='Tab 2' />,
      <TabContent key={Math.random()} label='Tab 3' />,
    ],
  },
}

export const Loading: CTabsStory = {
  args: {
    tabsNames: ['Tab 1', 'Tab 2', 'Tab 3'],
    tabsBody: [
      <TabContent key={Math.random()} label='Tab 1' />,
      <TabContent key={Math.random()} label='Tab 2' />,
      <TabContent key={Math.random()} label='Tab 3' />,
    ],
    isLoading: true,
  },
}

export const CustomPadding: CTabsStory = {
  args: {
    tabsNames: ['Tab 1', 'Tab 2', 'Tab 3'],
    tabsBody: [
      <TabContent key={Math.random()} label='Tab 1' />,
      <TabContent key={Math.random()} label='Tab 2' />,
      <TabContent key={Math.random()} label='Tab 3' />,
    ],
    p: 2,
  },
}

export const UrlSynchronization: CTabsStory = {
  args: {
    tabsNames: ['Tab 1', 'Tab 2', 'Tab 3'],
    tabsBody: [
      <TabContent key={Math.random()} label='Tab 1' />,
      <TabContent key={Math.random()} label='Tab 2' />,
      <TabContent key={Math.random()} label='Tab 3' />,
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'The `CTabs` component synchronizes the selected tab with the URL query parameter. Changing the tab will update the URL, and navigating directly to a URL with a specific tab query parameter will set the corresponding tab as active.',
      },
    },
  },
}

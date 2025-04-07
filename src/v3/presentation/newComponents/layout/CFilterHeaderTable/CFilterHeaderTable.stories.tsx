import { Meta, StoryObj } from '@storybook/react'

import { CFilterHeaderTable, ICFilterHeaderTable } from './CFilterHeaderTable'

const meta: Meta<ICFilterHeaderTable> = {
  title: 'Components/CFilterHeaderTable',
  component: CFilterHeaderTable,
  parameters: {
    docs: {
      description: {
        component:
          'The `CFilterHeaderTable` is a custom header component for tables that provides search, filter, and action functionality. It allows users to search for specific items, apply filters, and perform actions related to the table data.\n\n**Features:**\n- **Search Input:** Allows users to search for specific items in the table.\n- **Filter Button:** Provides a button to open a filter dialog or apply filters to the table data.\n- **Action Button:** Allows users to perform a specific action related to the table data.\n- **Chip List:** Displays a list of chips representing applied filters or other relevant information.\n\n**Recommended Use:**\nIdeal for tables that require search, filter, and action capabilities, such as data grids or lists with large amounts of data.',
      },
    },
  },
  argTypes: {
    placeholder: {
      description: 'Placeholder text for the search input.',
      control: 'text',
    },
    buttonLabel: {
      description: 'Label for the action button.',
      control: 'text',
    },
    buttonAction: {
      description: 'Function called when the action button is clicked.',
      control: 'function',
    },
    onSearch: {
      description: 'Function called when a search is performed.',
      control: 'function',
    },
    filterAction: {
      description: 'Function called when the filter button is clicked.',
      control: 'function',
    },
    inputValue: {
      description: 'Initial value for the search input.',
      control: 'text',
    },
    chipsList: {
      description: 'List of chips to be displayed.',
      control: 'array',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<ICFilterHeaderTable>

export const Default: Story = {
  args: {
    placeholder: 'Search...',
    buttonLabel: 'Action',
    inputValue: '',
    chipsList: [
      { label: 'Chip 1', value: 'Chip 1' },
      { label: 'Chip 2', value: 'Chip 2' },
      { label: 'Chip 3', value: 'Chip 3' },
    ],
    buttonAction: () => {
      alert('Action button clicked')
    },
    onSearch: (value) => {
      alert(`Search performed with value: ${value}`)
    },
    filterAction: () => {
      alert('Filter button clicked')
    },
  },
}

import type { Meta, StoryObj } from '@storybook/react'
import { Table, TableBody, TableCell, TableHead } from '@mui/material'

import { CTableRow } from './index'

const meta: Meta<typeof CTableRow> = {
  title: 'Atoms/CTableRow',
  component: CTableRow,
  parameters: {
    docs: {
      description: {
        component:
          'The `CTableRow` component is a wrapper around the Material UI `TableRow` component. It provides a consistent and customizable table row for use within a table.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'The content to be rendered within the table row',
    },
    hover: {
      control: 'boolean',
      description: 'Determines whether the table row should have a hover effect',
    },
    selected: {
      control: 'boolean',
      description: 'Determines whether the table row is selected',
    },
  },
}

export default meta

type CTableRowStory = StoryObj<typeof CTableRow>

export const Default: CTableRowStory = {
  render: (args) => (
    <Table>
      <TableHead>
        <CTableRow>
          <TableCell>Column 1</TableCell>
          <TableCell>Column 2</TableCell>
          <TableCell>Column 3</TableCell>
        </CTableRow>
      </TableHead>
      <TableBody>
        <CTableRow {...args}>
          <TableCell>Row 1, Cell 1</TableCell>
          <TableCell>Row 1, Cell 2</TableCell>
          <TableCell>Row 1, Cell 3</TableCell>
        </CTableRow>
      </TableBody>
    </Table>
  ),
}

export const Hover: CTableRowStory = {
  render: (args) => (
    <Table>
      <TableHead>
        <CTableRow>
          <TableCell>Column 1</TableCell>
          <TableCell>Column 2</TableCell>
          <TableCell>Column 3</TableCell>
        </CTableRow>
      </TableHead>
      <TableBody>
        <CTableRow {...args} hover>
          <TableCell>Row 1, Cell 1</TableCell>
          <TableCell>Row 1, Cell 2</TableCell>
          <TableCell>Row 1, Cell 3</TableCell>
        </CTableRow>
      </TableBody>
    </Table>
  ),
}

export const Selected: CTableRowStory = {
  render: (args) => (
    <Table>
      <TableHead>
        <CTableRow>
          <TableCell>Column 1</TableCell>
          <TableCell>Column 2</TableCell>
          <TableCell>Column 3</TableCell>
        </CTableRow>
      </TableHead>
      <TableBody>
        <CTableRow {...args} selected>
          <TableCell>Row 1, Cell 1</TableCell>
          <TableCell>Row 1, Cell 2</TableCell>
          <TableCell>Row 1, Cell 3</TableCell>
        </CTableRow>
      </TableBody>
    </Table>
  ),
}

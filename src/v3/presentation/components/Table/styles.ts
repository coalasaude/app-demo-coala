import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import styled from 'styled-components'

import { breakpoint } from '@/utils/breakpoints'

import { spacing } from '../../utils/spacing'

export const StyledTableCell = styled(TableCell)``

export const StyledTableRow = styled(TableRow)``

export const StyledTableRowClick = styled(StyledTableRow)`
  cursor: pointer;

  &:hover {
    background-color: var(--mui-palette-primary-light);
  }
`

export const StyledTableHead = styled(TableHead)``

export const StyledTableBody = styled(TableBody)``

export const StyledTable = styled(Table)`
  ${StyledTableHead} {
    ${StyledTableRow} {
      ${StyledTableCell} {
        border: none;
        background-color: var(--mui-palette-background-default);
        color: var(--mui-palette-grey-700);
        font-size: 10px;
        padding: ${spacing(2)} ${spacing(1)};
      }
    }

    @media (min-width: ${breakpoint('md')}) {
      ${StyledTableRow} {
        ${StyledTableCell} {
          font-size: 12px;
        }
      }
    }
  }

  ${StyledTableBody} {
    ${StyledTableRow} {
      ${StyledTableCell} {
        color: var(--mui-palette-blue-600);
        font-size: 12px;
        padding: ${spacing(2)} ${spacing(1)};
      }
    }

    @media (min-width: ${breakpoint('md')}) {
      ${StyledTableRow} {
        ${StyledTableCell} {
          font-size: 14px;
        }
      }
    }
  }
`

export const StyledTableContainer = styled.div`
  border-radius: 8px;
  padding: ${spacing(1)};
`

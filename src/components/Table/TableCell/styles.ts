import styledEngine from '@mui/styled-engine'
import { TableCell as MTableCell } from '@mui/material'

export const TableCell = styledEngine(MTableCell)`
  font-size: 16px;
  white-space: nowrap;
  background: white;
  border-bottom: 0;
  height: 75px;
  

  &:first-of-type {
    padding-left: 24px;
  }
`

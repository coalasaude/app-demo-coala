import styledEngine from '@mui/styled-engine'
import { TableRow as MTableRow } from '@mui/material'

export const TableRow = styledEngine(MTableRow)`
  padding: 8px;
  border-bottom: 0;
  transition: all .12s cubic-bezier(0, 0.24, 1, 1.24);



  &:hover td {
    background: var(--mui-palette-grey-200);
    transition: background .1s ease;
  }

  & td {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }


  ${({ onClick }) =>
    onClick &&
    `&:hover {
      td {
        cursor: pointer;
      }
    }`}
`

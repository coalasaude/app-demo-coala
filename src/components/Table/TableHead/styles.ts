import { styled } from '@mui/material/styles'
import { TableHead as MTableHead, TableHeadProps } from '@mui/material'

export const TableHead = styled(MTableHead)<TableHeadProps & { $noGutter?: boolean }>`
  font-size: 16px;
  white-space: nowrap;

  & th {
    color: ${({ theme }) => theme.palette.grey[400]} !important;
    background: rgb(249, 250, 251);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    height: 0;
    box-shadow: none;
    min-width: 20px;
    border-bottom: 0;
  }

  & tr:hover {
    box-shadow: unset;
  }

  ${({ $noGutter }) =>
    !$noGutter &&
    `
  & th:first-of-type {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }
  & th:last-child {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }
  `}
`

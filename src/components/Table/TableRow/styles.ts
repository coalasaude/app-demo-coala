import { TableRow as MTableRow } from '@mui/material'
import { styled } from '@mui/material/styles'

export const TableRow = styled(MTableRow)`
  padding: 8px;
  border-bottom: 0;
  transition: all 0.12s cubic-bezier(0, 0.24, 1, 1.24);

  &:hover {
    transform: scale(1, 1);
    box-shadow: 3px 7px 3px -4px ${({ theme }) => theme.palette.grey[300]};
  }

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;

  &:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  & td:first-of-type {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  & td:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  ${({ onClick, theme }) =>
    onClick &&
    `&:hover {
      td {
        background: ${theme.palette.primary.light};
        cursor: pointer;
      }
    }`}
`

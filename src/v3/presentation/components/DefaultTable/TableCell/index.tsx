import { SxProps, TableCellProps, Theme } from '@mui/material'

import { TableCell as STableCell } from './styles'

export interface ITableCell extends TableCellProps {
  isFixed?: boolean
}

export const TableCell: React.FC<ITableCell> = ({ children, isFixed, ...props }) => {
  const fixedSx: SxProps<Theme> = {
    ...props.sx,
    position: 'sticky',
    right: 0,
    textAlign: 'center',
    ':before': {
      top: 0,
      left: 0,
      background: '#e4e4e4',
      width: 3,
      position: 'absolute',
      height: '100%',
      content: '" "',
    },
  }
  return (
    <STableCell {...props} sx={isFixed ? fixedSx : props.sx}>
      {children}
    </STableCell>
  )
}

export default TableCell

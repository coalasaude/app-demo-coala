import { TableRowProps } from '@mui/material'

import { TableRow as STableRow } from './styles'

export const TableRow: React.FC<TableRowProps> = ({ children, ...props }) => {
  return (
    <STableRow sx={{ position: 'relative' }} {...props}>
      {children}
    </STableRow>
  )
}

export default TableRow

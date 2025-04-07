import { TableHeadProps } from '@mui/material'

import { TableHead as STableHead } from './styles'

export const TableHead: React.FC<TableHeadProps & { noGutter?: boolean }> = ({
  children,
  noGutter,
  ...props
}) => {
  return (
    <STableHead $noGutter={Boolean(noGutter)} {...props}>
      {children}
    </STableHead>
  )
}

export default TableHead

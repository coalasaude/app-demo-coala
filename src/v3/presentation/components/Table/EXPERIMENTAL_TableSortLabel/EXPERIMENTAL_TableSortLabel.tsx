import { TableSortLabel as MTableSortLabel, TableSortLabelProps } from '@mui/material'

export interface ITableSortLabel<T> extends Omit<TableSortLabelProps, 'onChange'> {
  direction?: 'asc' | 'desc'
  orderBy?: T
  name: T
  onChange: (name?: T, direction?: 'asc' | 'desc') => void
}

export function EXPERIMENTAL_TableSortLabel<T>({
  name,
  direction,
  orderBy,
  onChange,
  children,
}: ITableSortLabel<T>) {
  const onChangeSort = () => {
    if (orderBy !== name) onChange(name, 'asc')
    else if (!direction || direction === 'asc') onChange(name, 'desc')
    else onChange()
  }

  return (
    <MTableSortLabel direction={direction} active={orderBy === name} onClick={onChangeSort}>
      {children}
    </MTableSortLabel>
  )
}

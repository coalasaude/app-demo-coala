import { useState } from 'react'
import { Pagination } from '@mui/material'

import FilterInput from '@/components/Forms/uncontrolled/FilterInput'

import { CList } from '../CList'
import CPagination from '../CPagination'
import { NotFound } from '../NotFound'

type Pagination = {
  total: number
  limit: number
}

type CSearchListProps = {
  label: string
  items: string[]
  deleteButton?: boolean

  pagination?: Pagination

  name?: string

  onSearch?: (value: string) => void
  onClick?: () => void
  onDelete?: () => void
  onPaginate?: (page: number) => void
}

export const CSearchList = ({ items, name, label, onSearch, ...props }: CSearchListProps) => {
  const { pagination } = props

  const [filter, setFilter] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setFilter(value)
    onSearch && onSearch(value)
  }

  const handlePaginate = (page: number) => {
    props.onPaginate && props.onPaginate(page)
  }

  return (
    <>
      <FilterInput
        onChange={handleChange}
        name={name}
        value={filter}
        label={label}
        placeholder={label}
        onClearAddon={() => {
          setFilter('')
        }}
      />

      {items.length ? <CList items={items} {...props} /> : <NotFound />}

      {pagination && pagination.total > pagination.limit && (
        <CPagination total={pagination.total} limit={pagination.limit} onChange={handlePaginate} />
      )}
    </>
  )
}

import { Pagination, useMediaQuery } from '@mui/material'

import { PageCounter } from '@/components/Table'

import { PaginationWrapper } from '../../pages/appointment/Emergency/components/AppointmentListTab/styles'

type CPaginationProps = {
  total: number
  limit: number

  onChange?: (page: number) => void
}

export const CPagination = ({ total, limit, onChange }: CPaginationProps) => {
  const isSmallDevice = useMediaQuery('sm')

  const handleChange = (e: React.ChangeEvent<unknown>, page: number) => {
    onChange && onChange(page)
  }

  return (
    <PaginationWrapper>
      <Pagination
        count={Math.ceil(total / limit)}
        onChange={handleChange}
        color='primary'
        siblingCount={isSmallDevice ? 0 : 1}
      />

      <PageCounter count={total} />
    </PaginationWrapper>
  )
}

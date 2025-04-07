import { Pagination, PaginationProps } from '@mui/material'

import { PageCounter } from '@/components/Table'
import useMediaQuery from '@/hooks/useMediaQuery'

import { StyledPaginationWrapper } from './styles'

export const CPagination = (props: PaginationProps & { totalCount?: number }) => {
  const isSmallDevice = useMediaQuery('sm')

  return (
    <StyledPaginationWrapper>
      <Pagination color='primary' {...props} siblingCount={isSmallDevice ? 0 : 1} />
      <PageCounter count={props.totalCount || 0} />
    </StyledPaginationWrapper>
  )
}

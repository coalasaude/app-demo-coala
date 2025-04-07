import { Skeleton } from '@mui/material'
import { Box } from '@mui/system'
import { range } from 'lodash'
import { Fragment } from 'react'

import useMediaQuery from '@/hooks/useMediaQuery'
import Paper from '@/v3/presentation/components/Paper'

export const ViewSkeleton = ({
  contentSize = 2,
  tableSize = 1,
  withoutTitle = false,
}: {
  contentSize?: number
  tableSize?: number
  withoutTitle?: boolean
}) => {
  const isSmallDevice = useMediaQuery('sm')

  if (isSmallDevice) {
    return (
      <>
        <Box p='12px'>
          <Skeleton variant='text' width='80%' height={30} />
          <Box display='flex'>
            <Skeleton variant='text' width='45%' height={30} />
            <Box mx={2} flex={1}>
              <Skeleton variant='text' width='100%' height={30} />
            </Box>
          </Box>
          {range(contentSize).map((value) => (
            <Paper key={value} p={2} mb={2}>
              <Skeleton variant='text' width='50%' height={50} />
              <Box>
                <Skeleton variant='text' width='100%' height={30} sx={{ mr: '8px' }} />
                <Skeleton variant='text' width='100%' height={30} sx={{ mr: '8px' }} />
                <Skeleton variant='text' width='100%' height={30} sx={{ mr: '8px' }} />
              </Box>
            </Paper>
          ))}
        </Box>
      </>
    )
  }

  return (
    <>
      {!withoutTitle && (
        <Box>
          <Box width='100%'>
            <Skeleton variant='text' width='15%' height={30} />
            <Skeleton variant='text' width='30%' height={30} />
          </Box>
          <Skeleton variant='text' width='10%' height={50} />
        </Box>
      )}
      {range(contentSize).map((value) => (
        <Fragment key={value}>
          <Box display='flex'>
            <Skeleton variant='text' width='33%' height={50} sx={{ mr: '8px' }} />
            <Skeleton variant='text' width='33%' height={50} sx={{ mr: '8px' }} />
            <Skeleton variant='text' width='33%' height={50} sx={{ mr: '8px' }} />
          </Box>
          <Box display='flex'>
            <Skeleton variant='text' width='33%' height={50} sx={{ mr: '8px' }} />
            <Skeleton variant='text' width='33%' height={50} sx={{ mr: '8px' }} />
            <Skeleton variant='text' width='33%' height={50} sx={{ mr: '8px' }} />
          </Box>
        </Fragment>
      ))}
      {range(tableSize).map((value) => (
        <Fragment key={value}>
          <Box display='flex'>
            <Skeleton variant='text' width='15%' height={50} sx={{ mr: '8px' }} />
            <Skeleton variant='text' width='15%' height={50} sx={{ mr: '8px' }} />
            <Skeleton variant='text' width='15%' height={50} sx={{ mr: '8px' }} />
            <Skeleton variant='text' width='15%' height={50} sx={{ mr: '8px' }} />
            <Skeleton variant='text' width='15%' height={50} sx={{ mr: '8px' }} />
            <Skeleton variant='text' width='15%' height={50} sx={{ mr: '8px' }} />
            <Skeleton variant='text' width='15%' height={50} sx={{ mr: '8px' }} />
          </Box>
          <Box>
            <Skeleton variant='text' width='100%' height={50} sx={{ mr: '8px' }} />
            <Skeleton variant='text' width='100%' height={50} sx={{ mr: '8px' }} />
            <Skeleton variant='text' width='100%' height={50} sx={{ mr: '8px' }} />
            <Skeleton variant='text' width='100%' height={50} sx={{ mr: '8px' }} />
          </Box>
        </Fragment>
      ))}
    </>
  )
}

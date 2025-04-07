import { Skeleton } from '@mui/material'
import { Box } from '@mui/system'

import useMediaQuery from '@/hooks/useMediaQuery'

export const CardListSkeleton = () => {
  const isSmallDevice = useMediaQuery('sm')
  if (isSmallDevice) {
    return (
      <>
        <Box px={1}>
          <Skeleton variant='rectangular' width='100%' height={130} sx={{}} />
        </Box>
        <Box px={1}>
          <Skeleton variant='rectangular' width='100%' height={130} sx={{}} />
        </Box>
        <Box px={1}>
          <Skeleton variant='rectangular' width='100%' height={130} sx={{}} />
        </Box>
        <Box px={1}>
          <Skeleton variant='rectangular' width='100%' height={130} sx={{}} />
        </Box>
        <Box px={1}>
          <Skeleton variant='rectangular' width='100%' height={130} sx={{}} />
        </Box>
        <Box px={1}>
          <Skeleton variant='rectangular' width='100%' height={130} sx={{}} />
        </Box>
        <Box px={1}>
          <Skeleton variant='rectangular' width='100%' height={130} sx={{}} />
        </Box>
      </>
    )
  }
}

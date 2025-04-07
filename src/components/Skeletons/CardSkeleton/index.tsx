import { Skeleton } from '@mui/material'
import { Box } from '@mui/system'

import useMediaQuery from '@/hooks/useMediaQuery'

export const CardSkeleton = () => {
  const isSmallDevice = useMediaQuery('sm')
  if (isSmallDevice) {
    return (
      <>
        <Box width='100%' px={1}>
          <Skeleton variant='text' width='70%' height={70} sx={{ mb: '-32px' }} />
        </Box>
        <Box px={1}>
          <Skeleton variant='text' width='100%' height={150} sx={{ mb: '-32px' }} />
        </Box>
        <Box px={1}>
          <Skeleton variant='text' width='100%' height={150} sx={{ mb: '-32px' }} />
        </Box>
        <Box px={1}>
          <Skeleton variant='text' width='100%' height={150} sx={{ mb: '-32px' }} />
        </Box>
        <Box px={1}>
          <Skeleton variant='text' width='100%' height={150} sx={{ mb: '-32px' }} />
        </Box>
        <Box px={1}>
          <Skeleton variant='text' width='100%' height={150} sx={{ mb: '-32px' }} />
        </Box>
        <Box px={1}>
          <Skeleton variant='text' width='100%' height={150} sx={{ mb: '-32px' }} />
        </Box>
      </>
    )
  }

  return (
    <>
      <Box display='flex'>
        <Skeleton variant='text' width='33%' height={150} sx={{ mt: '-8px', mr: '8px' }} />
        <Skeleton variant='text' width='33%' height={150} sx={{ mt: '-8px', mr: '8px' }} />
        <Skeleton variant='text' width='33%' height={150} sx={{ mt: '-8px', mr: '8px' }} />
      </Box>
      <Box display='flex'>
        <Skeleton variant='text' width='33%' height={150} sx={{ mt: '-30px', mr: '8px' }} />
        <Skeleton variant='text' width='33%' height={150} sx={{ mt: '-30px', mr: '8px' }} />
        <Skeleton variant='text' width='33%' height={150} sx={{ mt: '-30px', mr: '8px' }} />
      </Box>
      <Box display='flex'>
        <Skeleton variant='text' width='33%' height={150} sx={{ mt: '-30px', mr: '8px' }} />
        <Skeleton variant='text' width='33%' height={150} sx={{ mt: '-30px', mr: '8px' }} />
        <Skeleton variant='text' width='33%' height={150} sx={{ mt: '-30px', mr: '8px' }} />
      </Box>
    </>
  )
}

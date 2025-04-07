import { Skeleton } from '@mui/material'
import { Box } from '@mui/system'

import useMediaQuery from '@/hooks/useMediaQuery'

export const ListSkeleton = () => {
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
      <Box>
        <Box width='100%'>
          <Skeleton variant='text' width='15%' height={70} sx={{ mb: '-18px' }} />
          <Skeleton variant='text' width='30%' height={70} />
        </Box>
        <Skeleton variant='text' width='10%' height={80} />
      </Box>

      <Skeleton variant='text' width='15%' height={50} />
      <Box display='flex'>
        <Skeleton variant='text' width='15%' height={70} sx={{ mt: '-8px', mr: '8px' }} />
        <Skeleton variant='text' width='15%' height={70} sx={{ mt: '-8px', mr: '8px' }} />
        <Skeleton variant='text' width='15%' height={70} sx={{ mt: '-8px', mr: '8px' }} />
        <Skeleton variant='text' width='15%' height={70} sx={{ mt: '-8px', mr: '8px' }} />
        <Skeleton variant='text' width='15%' height={70} sx={{ mt: '-8px', mr: '8px' }} />
        <Skeleton variant='text' width='15%' height={70} sx={{ mt: '-8px', mr: '8px' }} />
        <Skeleton variant='text' width='15%' height={70} sx={{ mt: '-8px', mr: '8px' }} />
      </Box>
      <Box>
        <Skeleton variant='text' width='100%' height={100} sx={{ mt: '-16px', mr: '8px' }} />
        <Skeleton variant='text' width='100%' height={100} sx={{ mt: '-16px', mr: '8px' }} />
        <Skeleton variant='text' width='100%' height={100} sx={{ mt: '-16px', mr: '8px' }} />
        <Skeleton variant='text' width='100%' height={100} sx={{ mt: '-16px', mr: '8px' }} />
      </Box>
    </>
  )
}

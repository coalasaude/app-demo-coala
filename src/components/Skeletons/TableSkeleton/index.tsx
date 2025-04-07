import { Skeleton } from '@mui/material'
import { Box } from '@mui/system'

export const TableSkeleton = () => {
  return (
    <Box p={1}>
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
        <Skeleton variant='text' width='100%' height={100} sx={{ mt: '-24px', mr: '8px' }} />
        <Skeleton variant='text' width='100%' height={100} sx={{ mt: '-24px', mr: '8px' }} />
        <Skeleton variant='text' width='100%' height={100} sx={{ mt: '-24px', mr: '8px' }} />
        <Skeleton variant='text' width='100%' height={100} sx={{ mt: '-24px', mr: '8px' }} />
      </Box>
    </Box>
  )
}

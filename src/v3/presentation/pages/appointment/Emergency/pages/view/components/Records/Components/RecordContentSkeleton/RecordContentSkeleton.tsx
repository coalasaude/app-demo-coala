import { Box, Skeleton } from '@mui/material'

export const RecordContentSkeleton = () => {
  return (
    <Box flex={1}>
      <Skeleton variant='rectangular' height={50} sx={{ mb: 2 }} />
      <Skeleton variant='rectangular' height={80} sx={{ mb: 2 }} />
      <Skeleton variant='rectangular' height={200} sx={{ mb: 2 }} />
    </Box>
  )
}

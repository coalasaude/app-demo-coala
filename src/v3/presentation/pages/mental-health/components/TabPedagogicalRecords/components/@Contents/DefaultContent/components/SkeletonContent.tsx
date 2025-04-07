import { Box, Skeleton } from '@mui/material'

export const ListSkeletonContent = () => {
  return (
    <Box display='flex' gap={2} flexDirection='column'>
      <Skeleton variant='rectangular' width='100%' height={56} sx={{}} />
      <Skeleton variant='rectangular' width='100%' height={56} sx={{}} />
      <Skeleton variant='rectangular' width='100%' height={56} sx={{}} />
      <Skeleton variant='rectangular' width='100%' height={56} sx={{}} />
      <Skeleton variant='rectangular' width='100%' height={56} sx={{}} />
    </Box>
  )
}

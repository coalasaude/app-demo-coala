import { Box, Skeleton } from '@mui/material'

export const SkeletonContent = () => {
  return (
    <Box>
      <Skeleton variant='text' width='100px' height={40} sx={{ mb: 1 }} />
      <Skeleton variant='rectangular' width='100%' height={130} sx={{}} />
    </Box>
  )
}

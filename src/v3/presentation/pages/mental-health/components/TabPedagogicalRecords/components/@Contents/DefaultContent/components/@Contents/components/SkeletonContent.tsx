import { Box, Skeleton } from '@mui/material'

export const SkeletonContent = () => {
  return (
    <Box>
      <Skeleton variant='rectangular' width='100%' height={200} sx={{}} />
    </Box>
  )
}

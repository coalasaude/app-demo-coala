import { Box, Skeleton } from '@mui/material'

export const SkeletonCard = () => {
  return (
    <Box>
      <Skeleton variant='rectangular' width='100%' height={300} sx={{ mt: 2, maxWidth: 650 }} />
    </Box>
  )
}

import { Box, Skeleton } from '@mui/material'

import Paper from '@/v3/presentation/components/Paper'

export const AccessSkeleton = () => (
  <Paper sx={{ p: 2 }}>
    <Skeleton variant='text' sx={{ fontSize: '2rem', width: ['100%', '40%'] }} />

    <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 1, width: ['40%', '20%'] }} />
    <Box display='flex' gap={2}>
      <Skeleton variant='rectangular' sx={{ mt: 1, width: ['100%', '40%'] }} height={60} />
    </Box>

    <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 2, width: ['40%', '20%'] }} />
    <Box display='flex' gap={2}>
      <Skeleton variant='rectangular' sx={{ mt: 1, width: ['100%', '25%'] }} height={60} />
    </Box>

    <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 2, width: ['40%', '20%'] }} />
    <Box display={['none', 'flex']} gap={2}>
      <Skeleton variant='rectangular' sx={{ mt: 1, width: ['100%', '50%'] }} height={60} />
      <Skeleton variant='rectangular' sx={{ mt: 1, width: ['100%', '50%'] }} height={60} />
    </Box>
    <Box display='flex' mr={[0, 2]}>
      <Skeleton variant='rectangular' sx={{ mt: 2, width: ['100%', '50%'] }} height={60} />
    </Box>
    <Box display='flex' mr={[0, 2]}>
      <Skeleton variant='rectangular' sx={{ mt: 2, width: ['100%', '50%'] }} height={60} />
    </Box>
    <Box display='flex' mr={[0, 2]}>
      <Skeleton variant='rectangular' sx={{ mt: 2, width: ['100%', '50%'] }} height={60} />
    </Box>
  </Paper>
)

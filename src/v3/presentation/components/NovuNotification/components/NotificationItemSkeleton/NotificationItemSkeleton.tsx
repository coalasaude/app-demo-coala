import { Box, Skeleton } from '@mui/material'

export const NotificationItemSkeleton = () => {
  return (
    <Box
      height='123px'
      display='grid'
      p={1}
      gridTemplateColumns={'48px 4fr'}
      gap={2}
      width='100%'
      position={'relative'}
    >
      <Skeleton variant='rectangular' height='48px' />
      <Box>
        <Skeleton variant='rectangular' height='70px' />
        <Box display='flex' gap={2} mt={'10px'}>
          <Skeleton variant='rectangular' height='20px' width={90} />
          <Skeleton variant='rectangular' height='20px' width={90} />
        </Box>
      </Box>
    </Box>
  )
}

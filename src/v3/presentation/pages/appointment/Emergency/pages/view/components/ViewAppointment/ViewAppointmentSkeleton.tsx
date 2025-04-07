import { Skeleton } from '@mui/material'
import { Box } from '@mui/system'

export const ViewAppointmentSkeleton = () => {
  return (
    <>
      <Box display='flex' flexDirection={['column', 'column', 'column', 'row']} gap={2}>
        <Box flex={7}>
          <Skeleton variant='rounded' height={210} />
        </Box>
        <Box flex={13}>
          <Skeleton variant='rounded' sx={{ height: [280, 210] }} />
        </Box>
      </Box>
      <Skeleton variant='rounded' sx={{ height: [180, 350] }} />
    </>
  )
}

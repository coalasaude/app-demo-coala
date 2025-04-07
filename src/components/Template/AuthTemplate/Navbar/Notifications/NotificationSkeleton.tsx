import React from 'react'
import { Skeleton, Box } from '@mui/material'

export const NotificationSkeleton = () => {
  return (
    <>
      <Box
        sx={(theme) => ({
          borderBottom: `1px solid ${theme.palette.grey[300]}`,
          padding: 2,
          width: '100%',
        })}
      >
        <Skeleton variant='text' width='80%' height={30} />
        <Skeleton variant='text' width='100%' height={20} />
        <Skeleton variant='text' width='100%' height={20} />
        <Skeleton variant='text' width='100%' height={20} />
      </Box>
      <Box width='100%' p={2}>
        <Skeleton variant='text' width='80%' height={30} />
        <Skeleton variant='text' width='100%' height={20} />
        <Skeleton variant='text' width='100%' height={20} />
        <Skeleton variant='text' width='100%' height={20} />
      </Box>
    </>
  )
}

export default NotificationSkeleton

import { Skeleton, Stack } from '@mui/material'

export const FormSkeleton = () => {
  return (
    <>
      <Skeleton height={80} sx={{ width: '33%' }} />

      <Stack display='flex' gap={0} mt={4}>
        <Skeleton height={100} />
        <Skeleton height={100} />
        <Skeleton height={100} />
      </Stack>
    </>
  )
}

import { useMediaQuery as mUseMediaQuery } from '@mui/material'

import { theme } from '@/theme'

export const useMediaQuery = (
  size: 'xl' | 'sm' | 'md' | 'xs' | 'lg',
  direction?: 'up' | 'down'
) => {
  return mUseMediaQuery(
    direction === 'up' ? theme.breakpoints.up(size as any) : theme.breakpoints.down(size as any)
  )
}

export default useMediaQuery

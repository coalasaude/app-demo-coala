import { breakpoints } from '@/constants/breakpoints'

type TSize = keyof typeof breakpoints
export const useBreakpoint = (size: TSize, direction?: 'up' | 'down') => {
  if (direction === 'up') {
    return document.body.offsetWidth >= breakpoints[size]
  }
  return document.body.offsetWidth <= breakpoints[size]
}

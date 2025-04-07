import breakpoints from '@/constants/breakpoints'

export const breakpoint = (size: 'sm' | 'md' | 'lg' | 'xl'): string => {
  return `${breakpoints[size]}px`
}

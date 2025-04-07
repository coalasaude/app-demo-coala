import useMediaQuery from '@/hooks/useMediaQuery'

export const useResponsiveWidth = (widthVariant?: string): string => {
  const breakpoints = {
    small: '100%',
    medium: '60%',
    large: '50%',
    default: '40%',
  }

  const isSmall = useMediaQuery('sm')
  const isMedium = useMediaQuery('md')
  const isLarge = useMediaQuery('lg')
  const isBigger = useMediaQuery('xl')

  if (isSmall) return breakpoints.small
  if (isMedium) return breakpoints.medium
  if (isLarge) return breakpoints.large
  if (isBigger) return breakpoints.default

  return widthVariant || breakpoints.default
}

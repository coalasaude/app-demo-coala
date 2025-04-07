import { Box } from '@mui/material'

import { StyledBrandLogo, StyledCollapsedLogo } from './styles'

export type CLogoSize = 24 | 32 | 48 | 64 | 80 | 96 | 112

export interface CLogoProps {
  size: CLogoSize
  variant: 'brand' | 'symbol' | 'brandAndSymbol'
  color?: string
}

export const CLogo = ({ size, variant, color = 'var(--mui-palette-primary-main)' }: CLogoProps) => {
  if (variant === 'brand') {
    return <StyledBrandLogo height={size} color={color} />
  }

  if (variant === 'symbol') {
    return <StyledCollapsedLogo height={size} color={color} />
  }

  if (variant === 'brandAndSymbol') {
    return (
      <Box display='flex'>
        <StyledBrandLogo height={size} color={color} />
        <StyledCollapsedLogo height={size} color={color} />
      </Box>
    )
  }
}

import { Box } from '@mui/material'

import { useBreakpoint } from '@/hooks/useBreakpoints'
import { colorSchemaMap } from '@/v3/presentation/constants/banner-color-schema-map'

type CardImageBannerProps = {
  color: 'primary' | 'secondary'
  image: (args: { width: number }) => React.ReactNode
}

export const CardImageBanner: React.FC<CardImageBannerProps> = ({ color, image }) => {
  const isMobile = useBreakpoint('sm')

  const width = isMobile ? 136 : 290

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      height='100%'
      width='100%'
      flex={1}
      sx={{
        backgroundColor: colorSchemaMap.light[color],
      }}
    >
      {image({ width })}
    </Box>
  )
}

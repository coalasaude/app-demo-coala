import { Box } from '@mui/material'

import { useBreakpoint } from '@/hooks/useBreakpoints'

import { colorSchemaMap } from '../../../../../v3/presentation/constants/banner-color-schema-map'

type CardImageBannerProps = {
  color?: 'primary' | 'secondary'
  image: (args: { width: number; height: number }) => React.ReactNode
  isModal?: boolean
}

export const CardImageBanner: React.FC<CardImageBannerProps> = ({ color, image, isModal }) => {
  const isMobile = useBreakpoint('sm')

  let height = isModal ? 85 : 156
  let width = isModal ? 85 : 288
  if (isMobile) {
    height = isModal ? 90 : 83
    width = isModal ? 101 : 64
  }

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      height='100%'
      position='relative'
      width='100%'
      flex={1}
      sx={{
        backgroundColor: color ? colorSchemaMap.light[color] : '',
      }}
    >
      {!isModal && (
        <Box width={'100%'} height='100%' position='absolute'>
          {image({ width, height })}
        </Box>
      )}
      {isModal && image({ width, height })}
    </Box>
  )
}

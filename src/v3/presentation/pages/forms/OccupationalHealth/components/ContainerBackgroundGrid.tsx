import { Box, BoxProps } from '@mui/material'

import LargeBackground from '/public/assets/svg/OccupationalHealth/largeBackground.png'
import MobileBackground from '/public/assets/svg/OccupationalHealth/mobileBackground.png'

import useMediaQuery from '@/hooks/useMediaQuery'

type Props = BoxProps & { backgroundColor?: string }

export const ContainerBackgroundGrid: React.FC<Props> = ({
  children,
  backgroundColor = '#F7F7FC',
  ...props
}) => {
  const isMobile = useMediaQuery('xl')
  const backgroundImage = isMobile ? `url(${MobileBackground.src})` : `url(${LargeBackground.src})`

  return (
    <Box
      sx={{
        backgroundColor,
        backgroundImage,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderRadius: '16px',
        padding: { xs: '32px 20px', md: '48px 50px', lg: '64px 250px' },
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '0px' : '48px',
        ...props,
      }}
    >
      {children}
    </Box>
  )
}

import { SvgIconComponent } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'

import useMediaQuery from '@/hooks/useMediaQuery'

interface HeaderSectionProps {
  title: string
  description: string
  Svg: SvgIconComponent
  buttonText: string
  onButtonClick: () => void
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  title,
  description,
  Svg,
  buttonText,
  onButtonClick,
}) => {
  const isMobile = useMediaQuery('sm')

  return (
    <Box
      display='flex'
      flexDirection={{ xs: 'column', md: 'row' }}
      alignItems='center'
      gap={{ xs: 4, md: 6 }}
    >
      {isMobile && (
        <Box flex={1}>
          <Svg width='100%' height='auto' />
        </Box>
      )}
      <Box flex={1}>
        <Typography
          fontSize={isMobile ? 28 : 36}
          fontWeight={900}
          color='primary'
          lineHeight='120%'
          mb={3}
        >
          {title}
        </Typography>
        <Typography
          fontSize={16}
          fontWeight={400}
          color='var(--mui-palette-grey-500)'
          lineHeight='120%'
          mb={4}
        >
          {description}
        </Typography>
        <Button
          variant='contained'
          color='primary'
          size='small'
          onClick={onButtonClick}
          fullWidth={isMobile}
        >
          {buttonText}
        </Button>
      </Box>
      {!isMobile && (
        <Box flex={1}>
          <Svg width='100%' height='auto' />
        </Box>
      )}
    </Box>
  )
}

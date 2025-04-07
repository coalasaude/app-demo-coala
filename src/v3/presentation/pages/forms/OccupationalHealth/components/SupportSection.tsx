import { SvgIconComponent } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'

import useMediaQuery from '@/hooks/useMediaQuery'

interface SupportSectionProps {
  title: string
  description: string
  subDescription: string
  buttonText: string
  Svg: SvgIconComponent
  onButtonClick: () => void
}

export const SupportSection: React.FC<SupportSectionProps> = ({
  title,
  description,
  buttonText,
  Svg,
  subDescription,
  onButtonClick,
}) => {
  const isMobile = useMediaQuery('xl')

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      flexDirection={{ xs: 'column-reverse', md: 'row' }}
      padding={{ xs: 3, md: 6 }}
      borderRadius={4}
      gap={{ xs: 4, md: 8 }}
    >
      {!isMobile && (
        <Box flex={1}>
          <Svg width='100%' height='auto' />
        </Box>
      )}

      <Box flex={1}>
        {isMobile && (
          <Box flex={1} mb={2}>
            <Svg width='100%' height='auto' />
          </Box>
        )}
        <Typography
          fontSize={isMobile ? 18 : 24}
          fontWeight={900}
          color='primary'
          lineHeight='120%'
          mb={3}
        >
          {title}
        </Typography>
        <Typography
          fontSize={isMobile ? 14 : 16}
          fontWeight={400}
          color='var(--mui-palette-grey-500)'
          lineHeight='120%'
          mb={2}
        >
          {description}
        </Typography>
        <Typography
          fontSize={16}
          fontWeight={400}
          color='var(--mui-palette-grey-500)'
          lineHeight='120%'
          mb={3}
        >
          {subDescription}
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
    </Box>
  )
}

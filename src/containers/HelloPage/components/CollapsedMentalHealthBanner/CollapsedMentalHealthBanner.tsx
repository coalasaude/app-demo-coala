import { Box, Typography } from '@mui/material'

import CollapsedMentalHealthBannerImage from '/public/assets/images/HelloPage/MentalHealth/CollapsedMentalHealthBanner.svg'

export const CollapsedMentalHealthBanner = () => {
  return (
    <Box
      width='100%'
      height='100%'
      display='flex'
      alignItems='center'
      flexDirection='column'
      gap={1}
      py={1}
      px={2}
    >
      <Typography
        fontSize='24px'
        fontWeight='bold'
        color='var(--mui-palette-primary-main)'
        lineHeight={'28px'}
      >
        Conheça os nossos novos recursos de saúde mental!
      </Typography>
      <Typography fontSize='14px' fontWeight='light' color='var(--mui-palette-primary-main)'>
        Gostaríamos de te convidar a participar dos nossos testes gratuitos de{' '}
        <Typography fontWeight='bold' color='var(--mui-palette-primary-main)' display='inline'>
          saúde mental.
        </Typography>
      </Typography>

      <Box flex={1} mt={-1.5}>
        <CollapsedMentalHealthBannerImage width={170} />
      </Box>
    </Box>
  )
}

export default CollapsedMentalHealthBanner

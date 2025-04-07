import { Box, Typography } from '@mui/material'

import MentalHealthBannerImage from '/public/assets/images/HelloPage/MentalHealth/MentalHealthBannerFour.svg'
import MentalHealthBannerBg from '/public/assets/images/HelloPage/MentalHealth/ValidationMentalHealthPageBgCollaborator.png'
import Logo from '/public/assets/svg/logo.svg'

import useMediaQuery from '@/hooks/useMediaQuery'
import { CButton } from '@/v3/presentation/newComponents'

type Props = {
  onClick: () => void
}

export const MentalHealthContainerPageBody = ({ onClick }: Props) => {
  const isTablet = useMediaQuery('md')
  const size = isTablet ? '250px' : '550px'

  return (
    <Box
      overflow='hidden'
      sx={{
        backgroundImage: `url(${MentalHealthBannerBg.src})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius: '8px',
        border: '1px',
      }}
    >
      <Box display='flex' alignItems='center' justifyContent='center'>
        <Box display='flex' gap={1} justifyContent='center'>
          <Box px={5}>
            <Typography
              maxWidth={370}
              color='var(--mui-palette-primary-main)'
              fontWeight={800}
              lineHeight='44px'
              fontSize={[, '32px !important', '36px !important', '40px !important']}
              pt={1}
            >
              Agende um horário com a nossa equipe e saiba mais como
            </Typography>
            <Typography
              maxWidth={329}
              color='var(--mui-palette-secondary-main)'
              fontWeight={800}
              lineHeight='44px'
              fontSize={[, '32px !important', '36px !important', '40px !important']}
              pt={1}
            >
              Podemos ajudar a sua escola.
            </Typography>
            <Box pt={[1, 2]}>
              <CButton fullWidth sx={{ borderRadius: 4, maxWidth: 330 }} onClick={onClick}>
                AGENDAR MEU HORÁRIO
              </CButton>
            </Box>
            <Box pt={[, 1, 2, 4]}>
              <Logo
                style={{
                  height: '44px',
                  width: '130px',
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box>
          <MentalHealthBannerImage
            style={{
              paddingLeft: isTablet ? '0' : '50px',
              minHeight: size,
              minWidth: size,
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

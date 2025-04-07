import { Box, Typography } from '@mui/material'

import { CButton } from '@/v3/presentation/newComponents'
import useMediaQuery from '@/hooks/useMediaQuery'

import MentalHealthBannerImage from '/public/assets/images/HelloPage/MentalHealth/MentalHealthBannerFour.svg'

import { TitleIcon } from './TitleIcon'

interface MentalHealthReportBannerBodyProps {
  onClick: () => void
}

export const MentalHealthManagerBannerBody = ({ onClick }: MentalHealthReportBannerBodyProps) => {
  const isMobile = useMediaQuery('sm')

  return (
    <Box
      display='flex'
      justifyContent='space-around'
      alignItems='center'
      height={[, , 182]}
      width='100%'
    >
      <Box display='flex' flexDirection='column' gap={1} width='100%'>
        <Box display='flex' gap={1} width='100%'>
          <TitleIcon isModal={false} />
          <Box>
            <Typography
              maxWidth={[200, 400, 400]}
              color='var(--mui-palette-primary-main)'
              fontWeight={800}
              lineHeight={['17.6px', '22px', '23px']}
              fontSize={['14px !important', '22px !important']}
            >
              Enfrentando dificuldades com alunos que precisam de{' '}
              <Typography
                component={'span'}
                color='var(--mui-palette-secondary-main)'
                lineHeight={['17.6px', '22px', '23px']}
                fontWeight={800}
                fontSize={['14px !important', '22px !important']}
              >
                apoio especializado?
              </Typography>
            </Typography>
            <Typography
              fontSize={['14px !important', '16px !important']}
              color='var(--mui-palette-secondary-main)'
              mt={['4px', 0]}
            >
              Nossa equipe pode te ajudar!
            </Typography>
          </Box>
        </Box>

        <CButton
          sx={{
            width: [160, 220, 300],
            height: [20, 30, 40],
            borderRadius: 10,
            ml: [0, 6],
            mt: ['4px', 0, 1],
            whiteSpace: 'nowrap',
          }}
          onClick={onClick}
        >
          <Typography
            color='white'
            fontSize={['8px !important', '12px !important', '16px !important']}
          >
            QUERO SABER MAIS
          </Typography>
        </CButton>
      </Box>
      <Box mt={[2.4, 1, 1, 1]}>
        <MentalHealthBannerImage
          style={{ width: isMobile ? '141' : '', height: isMobile ? '149' : '' }}
        />
      </Box>
    </Box>
  )
}

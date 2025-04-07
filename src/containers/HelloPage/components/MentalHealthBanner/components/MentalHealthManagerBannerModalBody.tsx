import { Box, Typography } from '@mui/material'

import { CButton } from '@/v3/presentation/newComponents'
import useMediaQuery from '@/hooks/useMediaQuery'

import { TitleIcon } from './TitleIcon'

interface MentalHealthReportBannerModalBodyProps {
  onClick: () => void
}

export const MentalHealthManagerBannerModalBody = ({
  onClick,
}: MentalHealthReportBannerModalBodyProps) => {
  const isMobile = useMediaQuery('sm')

  return (
    <Box
      sx={{
        position: 'relative',
        width: ['100%', '100%', 400],
        borderRadius: '6px',
      }}
    >
      <Box display='flex' flexDirection='column' gap={1}>
        <Box display='flex' gap={1}>
          <TitleIcon isModal={true} />
          <Typography
            maxWidth='214px'
            color='var(--mui-palette-primary-main)'
            fontWeight={800}
            fontSize={isMobile ? '16px !important' : '20px !important'}
          >
            Enfrentando dificuldades com alunos que precisam de{' '}
            <Typography
              component={'span'}
              color='var(--mui-palette-secondary-main)'
              fontWeight={800}
              fontSize={isMobile ? '16px !important' : '20px !important'}
            >
              apoio especializado?
            </Typography>
          </Typography>
        </Box>

        <Typography fontSize={16} color='var(--mui-palette-secondary-main)' ml={4} width={'30%'}>
          Nossa equipe pode te ajudar!
        </Typography>

        <CButton
          sx={{
            width: 190,
            height: 32,
            borderRadius: 10,
            mt: ['10px', 6],
            ml: 4,
            whiteSpace: 'nowrap',
          }}
          onClick={onClick}
        >
          <Typography color='white' fontSize={'12px !important'}>
            QUERO SABER MAIS
          </Typography>
        </CButton>
      </Box>
    </Box>
  )
}

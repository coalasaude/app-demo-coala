import { Box, Typography } from '@mui/material'

import { CButton } from '@/v3/presentation/newComponents'
import useMediaQuery from '@/hooks/useMediaQuery'

import MentalHealthBannerImage from '/public/assets/images/HelloPage/MentalHealth/MentalHealthBannerFive.svg'

interface MentalHealthReportBannerBodyProps {
  onClick: () => void
}

export const MentalHealthCollaboratorBannerBody = ({
  onClick,
}: MentalHealthReportBannerBodyProps) => {
  const isMobile = useMediaQuery('sm')

  return (
    <Box
      display='flex'
      justifyContent='space-around'
      alignItems='center'
      height={[, 182, 182]}
      width='100%'
    >
      <Box display='flex' flexDirection='column' gap={1} width='100%'>
        <Box display='flex' justifyContent='center' gap={1} width='100%'>
          <Box mt={[-2, , ,]}>
            <Typography
              maxWidth={[200, 400, 400]}
              color='var(--mui-palette-primary-main)'
              fontWeight={800}
              lineHeight={['19.8px', '23.6px']}
              fontSize={[
                '18px !important',
                '22px !important',
                '22px !important',
                '22px !important',
              ]}
            >
              O estresse está{' '}
              <Typography
                maxWidth={[200, 400, 550]}
                color='var(--mui-palette-primary-main)'
                lineHeight={['19.8px', '23.6px']}
                fontWeight={800}
                fontSize={[
                  '18px !important',
                  '22px !important',
                  '22px !important',
                  '22px !important',
                ]}
              >
                afetando sua rotina?
              </Typography>
            </Typography>
            <Typography
              fontSize={['14px !important', '16px !important', '16px !important']}
              fontWeight={400}
              lineHeight={['15.4px', '17.8px']}
              color='white'
              mt={[1, 1]}
            >
              Oferecemos apoio emocional para te ajudar a lidar com os desafios e melhorar seu
              bem-estar.
            </Typography>
            <CButton
              sx={{
                width: [160, 220, 300],
                height: [20, 30, 40],
                borderRadius: 10,
                mt: [1, 2, 2],
                whiteSpace: 'nowrap',
                bgcolor: '#FEF592',
                ':hover': {
                  background: '#fec601',
                },
              }}
              onClick={onClick}
            >
              <Typography
                color='primary'
                fontSize={['8px !important', '12px !important', '16px !important']}
              >
                QUERO SABER MAIS
              </Typography>
            </CButton>
          </Box>
        </Box>
      </Box>
      <Box mt={[-3, 1, 1, 1]} mr={[-3, , , 0, 0]}>
        <MentalHealthBannerImage
          style={{ width: isMobile ? '161' : '', height: isMobile ? '191' : '' }}
        />
      </Box>
    </Box>
  )
}

import { Box, Typography } from '@mui/material'

import { CButton } from '@/v3/presentation/newComponents'

interface MentalHealthReportBannerModalBodyProps {
  onClick: () => void
}

export const MentalHealthCollaboratorBannerModalBody = ({
  onClick,
}: MentalHealthReportBannerModalBodyProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: ['100%', '100%', 400],
        borderRadius: '6px',
      }}
    >
      <Box display='flex' flexDirection='column' gap={1} mt={1} ml={[2, 4]}>
        <Box display='flex' gap={1}>
          <Typography
            maxWidth={300}
            color='var(--mui-palette-primary-main)'
            fontWeight={800}
            fontSize='24px !important'
            lineHeight='28.08px'
          >
            O estresse está{' '}
            <Typography
              maxWidth={[250, 300]}
              color='var(--mui-palette-primary-main)'
              fontWeight={800}
              fontSize='24px !important'
              lineHeight='28.08px'
            >
              afetando sua rotina?
            </Typography>
          </Typography>
        </Box>

        <Typography fontSize={16} color='white' maxWidth={[220, 250]} lineHeight='17.6px'>
          Oferecemos apoio emocional para te ajudar a lidar com os desafios
        </Typography>
        <Typography fontSize={16} color='white' maxWidth={[220, 250]} lineHeight='17.6px' mt={-1}>
          e melhorar seu bem-estar.
        </Typography>

        <CButton
          sx={{
            width: 190,
            height: 32,
            borderRadius: 10,
            mt: ['10px', 3],
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
            AGENDE SUA SESSÃO
          </Typography>
        </CButton>
      </Box>
    </Box>
  )
}

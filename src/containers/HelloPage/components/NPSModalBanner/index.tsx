import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import { ModalCard } from '@/v3/presentation/components/Modal/ModalCard/ModalCard'

import GirlWithLaptopOnZoomMeeting from '/public/assets/svg/GirlWithLaptopOnZoomMeeting.svg'

import { CButton } from '@/v3/presentation/newComponents'
import useMediaQuery from '@/hooks/useMediaQuery'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { NEW_ROUTES } from '@/constants/routes'

export const NPSModalBanner = () => {
  const isMobile = useMediaQuery('sm')
  const { handleModal } = useModalContext()
  const router = useRouter()

  const onClose = () => {
    handleModal()
    handleModal()
  }

  const handleClick = () => {
    onClose()
    router.push(NEW_ROUTES.AUTHENTICATED.FORMS.NPS.path)
    onClose()
  }

  if (isMobile) {
    return (
      <ModalCard
        onClose={onClose}
        sx={{
          backgroundImage: `url('/assets/images/HelloPage/BG_NPS_Mobile.png') !important`,
          backgroundRepeat: 'no-repeat !important',
          backgroundSize: 'cover !important',
        }}
      >
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
          <GirlWithLaptopOnZoomMeeting style={{ width: '315px', marginTop: '16px' }} />
          <Box width='100%'>
            <Box display='flex' flexDirection='column' mb={1}>
              <Typography
                sx={{ fontSize: '28px !important', fontWeight: 900, lineHeight: '39.2px' }}
              >
                Sua opinião é muito
              </Typography>
              <Typography
                sx={{
                  fontSize: '28px !important',
                  fontWeight: 900,
                  color: 'var(--mui-palette-primary-main)',
                  lineHeight: '39.2px',
                }}
              >
                importante para nós!
              </Typography>
            </Box>
            <Typography
              sx={{ fontSize: '16px !important', fontWeight: 300, lineHeight: '22.4px' }}
              mb={2}
            >
              Em poucos minutos, você pode nos ajudar a melhorar ainda mais a nossa experiência de
              carinho e cuidado :)
            </Typography>
            <CButton onClick={handleClick} fullWidth>
              Responder a pesquisa
            </CButton>
          </Box>
        </Box>
      </ModalCard>
    )
  }

  return (
    <ModalCard
      onClose={onClose}
      sx={{
        backgroundImage: `url('/assets/images/HelloPage/BG_NPS_desktop.png') !important`,
        backgroundRepeat: 'no-repeat !important',
        backgroundSize: 'cover !important',
        width: [
          '',
          '90% !important',
          '80% !important',
          '60% !important',
          '50% !important',
          '50% !important',
          '40% !important',
        ],
        minHeight: '412px !important',
        maxWidth: '768px !important',
      }}
    >
      <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center' gap={3}>
        <GirlWithLaptopOnZoomMeeting style={{ width: '336px', marginTop: '16px' }} flex={1} />
        <Box flex={1}>
          <Box display='flex' flexDirection='column' mb={1}>
            <Typography sx={{ fontSize: '32px !important', fontWeight: 900, lineHeight: '35.2px' }}>
              Sua opinião é muito
            </Typography>
            <Typography
              sx={{
                fontSize: '32px !important',
                fontWeight: 900,
                color: 'var(--mui-palette-primary-main)',
                lineHeight: '35.2px',
              }}
            >
              importante para nós!
            </Typography>
          </Box>
          <Typography
            sx={{ fontSize: '18px !important', fontWeight: 300, lineHeight: '25.2px' }}
            mb={2}
          >
            Em poucos minutos, você pode nos ajudar a melhorar ainda mais a nossa experiência de
            carinho e cuidado :)
          </Typography>
        </Box>
      </Box>
      <Box display='flex' justifyContent='flex-end'>
        <CButton onClick={handleClick}>Responder a pesquisa</CButton>
      </Box>
    </ModalCard>
  )
}

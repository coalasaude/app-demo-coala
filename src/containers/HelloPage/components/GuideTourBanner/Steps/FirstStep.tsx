import { Box, Dialog, Typography } from '@mui/material'
import { useState } from 'react'

import { ModalCard } from '@/v3/presentation/components/Modal/ModalCard/ModalCard'

import GirlWithLaptopOnMeeting from '/public/assets/svg/GirlWithLaptopOnMeeting.svg'

import { CButton } from '@/v3/presentation/newComponents'
import useMediaQuery from '@/hooks/useMediaQuery'
import { useModalContext } from '@/v3/presentation/components/Modal'

import GuideTourBannerSecondStep from './SecondStep'

export const GuideTourBanner = ({ guideTourType }: { guideTourType: string }) => {
  const isMobile = useMediaQuery('sm')
  const { handleModal } = useModalContext()
  const [openSecondModal, setOpenSecondModal] = useState(false)

  const handleClick = () => {
    setOpenSecondModal(true)
  }

  const handleSkipModal = () => {
    handleModal()
  }

  return (
    <Dialog
      open={!!open}
      onClose={handleSkipModal}
      aria-labelledby='invalidate-second-banner-dialog'
      aria-describedby='invalidate-second-banner-dialog'
    >
      <ModalCard
        sx={{
          backgroundImage: `url('/assets/images/HelloPage/BG_INSTAGRAM_desktop.png') !important`,
          backgroundRepeat: 'no-repeat !important',
          backgroundSize: 'cover !important',
          width: '100% !important',
          minHeight: '412px !important',
          maxWidth: '768px !important',
        }}
      >
        <Box
          display='flex'
          flexDirection={isMobile ? 'column' : 'row'}
          alignItems='center'
          justifyContent='center'
          gap={isMobile ? 0 : 3}
        >
          <GirlWithLaptopOnMeeting
            style={{ width: isMobile ? '315px' : '336px' }}
            flex={isMobile ? 0 : 1}
          />
          <Box flex={1}>
            <Box display='flex' flexDirection='column'>
              <Typography
                sx={{
                  fontSize: isMobile ? '28px !important' : '40px !important',
                  fontWeight: 900,
                }}
              >
                Bem vindo à
              </Typography>
              <Typography
                sx={{
                  fontSize: isMobile ? '28px !important' : '40px !important',
                  fontWeight: 900,
                  color: 'var(--mui-palette-primary-main)',
                }}
              >
                Coala Saúde!
              </Typography>
            </Box>
            <Typography
              sx={{ fontSize: isMobile ? '16px !important' : '18px !important', fontWeight: 300 }}
              mb={2}
            >
              Vem comigo que eu vou te mostrar como funciona nossa forma de entregar carinho e
              cuidado :)
            </Typography>
          </Box>
        </Box>
        <Box display='flex' justifyContent='flex-end' gap={2} mb={-1}>
          <CButton variant='secondary' onClick={handleSkipModal} sx={{ width: '30%' }}>
            Pular
          </CButton>
          <CButton onClick={handleClick} sx={{ width: '30%' }}>
            Próximo
          </CButton>
        </Box>
      </ModalCard>
      <GuideTourBannerSecondStep open={openSecondModal} guideTourType={guideTourType} />
    </Dialog>
  )
}

export default GuideTourBanner

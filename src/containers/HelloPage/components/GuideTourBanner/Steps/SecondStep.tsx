import { Box, Dialog, Typography } from '@mui/material'
import { useState } from 'react'

import { ModalCard } from '@/v3/presentation/components/Modal/ModalCard/ModalCard'

import SecondStepBanner from '/public/assets/images/HelloPage/SecondStepBanner.svg'

import { CButton } from '@/v3/presentation/newComponents'
import useMediaQuery from '@/hooks/useMediaQuery'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { target } from '@/v3/presentation/newComponents/atoms/CJoyride/constants'

import GuideTourBannerFinalStep from './FinalStep'

type Props = {
  guideTourType: string
  open?: boolean
}

export const GuideTourBannerSecondStep = ({ guideTourType, open }: Props) => {
  const isMobile = useMediaQuery('sm')
  const { handleModal } = useModalContext()
  const [openFinalBanner, setOpenFinalBanner] = useState(false)
  const fontSize = isMobile ? '28px !important' : '40px !important'
  const fontWeight = 900
  const color = 'var(--mui-palette-primary-main)'
  const fontSizeSubtitle = isMobile ? '16px !important' : '18px !important'
  const fontWeightSubTitle = 300

  const handleClick = () => {
    setOpenFinalBanner(true)
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
          minHeight: '410px !important',
          maxWidth: '768px !important',
        }}
      >
        <Box
          id={target.coalaSecondStepBanner}
          display='flex'
          flexDirection={isMobile ? 'column' : 'row'}
          alignItems='center'
          justifyContent='center'
          gap={isMobile ? 0 : 3}
          mb={6}
        >
          <SecondStepBanner
            style={{ width: isMobile ? '315px' : '336px', marginTop: '16px' }}
            flex={isMobile ? 0 : 1}
          />
          <Box flex={1}>
            <Box display='flex' justifyContent='left'>
              <Typography sx={{ fontSize, fontWeight }}>O que a ‎</Typography>
              <Typography sx={{ fontSize, fontWeight, color }}>Coala</Typography>
            </Box>
            <Box display='flex' justifyContent='left' mb={2}>
              <Typography sx={{ fontSize, fontWeight, color }}>Saúde ‎</Typography>
              <Typography sx={{ fontSize, fontWeight }}>faz?</Typography>
            </Box>

            <Typography sx={{ fontSize: fontSizeSubtitle, fontWeight }}>
              Atendimento médico das 7h às 19h de segunda a sexta:
            </Typography>
            <Typography sx={{ fontSize: fontSizeSubtitle, fontWeight: fontWeightSubTitle }} mb={2}>
              para qualquer situação de saúde na sua escola.
            </Typography>
          </Box>
        </Box>
        <Box display='flex' justifyContent='flex-end' gap={2}>
          <CButton variant='secondary' onClick={handleSkipModal} sx={{ width: '30%' }}>
            Pular
          </CButton>
          <CButton onClick={handleClick} sx={{ width: '30%' }}>
            Próximo
          </CButton>
        </Box>
      </ModalCard>
      <GuideTourBannerFinalStep guideTourType={guideTourType} open={openFinalBanner} />
    </Dialog>
  )
}

export default GuideTourBannerSecondStep

import { Box, Dialog, Typography } from '@mui/material'
import { usePostHog } from 'posthog-js/react'

import { ModalCard } from '@/v3/presentation/components/Modal/ModalCard/ModalCard'

import FinalStepBanner from '/public/assets/images/HelloPage/FinalStepBanner.svg'

import { CButton } from '@/v3/presentation/newComponents'
import useMediaQuery from '@/hooks/useMediaQuery'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { target } from '@/v3/presentation/newComponents/atoms/CJoyride/constants'
import { useJoyrideContext } from '@/v3/presentation/newComponents/atoms/CJoyride/useJoyrideContext'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'

type Props = {
  guideTourType: string
  open?: boolean
}

export const GuideTourBannerFinalStep = ({ guideTourType, open }: Props) => {
  const posthog = usePostHog()
  const { getCount } = usePageTimeCounter()
  const isMobile = useMediaQuery('sm')
  const { handleModal } = useModalContext()
  const { setState } = useJoyrideContext()
  const fontSize = isMobile ? '28px !important' : '40px !important'
  const fontWeight = 900
  const color = 'var(--mui-palette-primary-main)'
  const fontSizeSubtitle = isMobile ? '16px !important' : '18px !important'
  const fontWeightSubTitle = 300
  const buttonSx = { width: !isMobile ? '30%' : '100%' }

  const handleClick = () => {
    handleModal()
    setState({ run: true, guideTourType })
    captureEvent()
    event?.stopPropagation()
  }

  const captureEvent = () => {
    posthog.capture('guide_tour', {
      type: guideTourType,
      status: 'skip',
      time_spent: getCount(),
    })
  }

  const handleSkipModal = () => {
    handleModal()
    event?.stopPropagation()
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
          <FinalStepBanner
            style={{ width: isMobile ? '315px' : '336px', marginTop: '16px' }}
            flex={isMobile ? 0 : 1}
          />
          <Box flex={1}>
            <Box display='flex' justifyContent='left'>
              <Typography sx={{ fontSize, fontWeight }}>A ‎</Typography>
              <Typography sx={{ fontSize, fontWeight, color }}>Coala Saúde</Typography>
            </Box>
            <Box display='flex' justifyContent='left' mb={2}>
              <Typography sx={{ fontSize, fontWeight }}>oferece também:</Typography>
            </Box>
            <Box flex={1} ml={2}>
              <ul style={{ paddingLeft: '20px', margin: 0 }}>
                <li>
                  <Typography sx={{ fontSize: fontSizeSubtitle, fontWeight }}>
                    Monitoramento e reportes de saúde
                  </Typography>
                  <Typography
                    sx={{ fontSize: fontSizeSubtitle, fontWeight: fontWeightSubTitle }}
                    mb={1}
                  >
                    de alunos e colaboradores.
                  </Typography>
                </li>
                <li>
                  <Typography sx={{ fontSize: fontSizeSubtitle, fontWeight }}>
                    Comunicados e protocolos
                  </Typography>
                  <Typography sx={{ fontSize: fontSizeSubtitle, fontWeight: fontWeightSubTitle }}>
                    sobre doenças infectocontagiosas e muito mais!
                  </Typography>
                </li>
              </ul>
            </Box>
          </Box>
        </Box>
        <Box display='flex' justifyContent='flex-end' gap={2}>
          <CButton variant='secondary' onClick={handleSkipModal} sx={buttonSx}>
            Pular
          </CButton>
          <CButton onClick={handleClick} sx={buttonSx}>
            Iniciar tour guiado
          </CButton>
        </Box>
      </ModalCard>
    </Dialog>
  )
}

export default GuideTourBannerFinalStep

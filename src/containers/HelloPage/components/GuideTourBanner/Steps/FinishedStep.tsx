import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import { ModalCard } from '@/v3/presentation/components/Modal/ModalCard/ModalCard'

import FinishedStepIcon from '/public/assets/images/HelloPage/FinishedStepIcon.svg'

import { CButton } from '@/v3/presentation/newComponents'
import useMediaQuery from '@/hooks/useMediaQuery'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { WebViewManager } from '@/services/WebView'
import { instagramCoala } from '@/constants/links'
import { NEW_ROUTES } from '@/constants/routes'

export const GuideTourBannerFinished = () => {
  const isMobile = useMediaQuery('sm')
  const router = useRouter()
  const { handleModal } = useModalContext()
  const fontSize = isMobile ? '20px !important' : '32px !important'
  const fontWeight = 900
  const color = 'var(--mui-palette-primary-main)'
  const fontSizeSubtitle = isMobile ? '14px !important' : '16px !important'
  const fontWeightSubTitle = 300
  const fontWeightSubTitleBold = 700
  const buttonSx = { width: !isMobile ? '30%' : '100%' }

  const handleCloseModal = () => {
    handleModal()
    router.push(NEW_ROUTES.AUTHENTICATED.HELLO.path)
    handleModal()
  }

  const handleClick = () => {
    WebViewManager.open(instagramCoala)
    handleCloseModal()
  }

  return (
    <ModalCard
      onClose={handleCloseModal}
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
        display='flex'
        flexDirection={isMobile ? 'column' : 'row'}
        alignItems='center'
        justifyContent='center'
        gap={isMobile ? 0 : 3}
      >
        <FinishedStepIcon
          style={{ width: isMobile ? '315px' : '336px', marginTop: '16px' }}
          flex={isMobile ? 0 : 1}
        />
        <Box flex={1}>
          <Box>
            <Typography sx={{ fontSize, fontWeight }}>
              Não perca nenhuma novidade sobre{' '}
              <Typography component='span' sx={{ fontSize, fontWeight, color, mt: -1, mb: 1 }}>
                saúde e bem-estar.
              </Typography>
            </Typography>
          </Box>

          <Typography
            sx={{ fontSize: fontSizeSubtitle, fontWeight: fontWeightSubTitle, maxWidth: 280 }}
          >
            Siga-nos no Instagram{' '}
            <Typography
              component='span'
              sx={{ fontSize: fontSizeSubtitle, fontWeight: fontWeightSubTitleBold, color }}
            >
              @coalasaude{' '}
            </Typography>
            para ficar por dentro das nossas dicas e novidades!
          </Typography>
        </Box>
      </Box>
      <Box display='flex' justifyContent='flex-end' mt={2} gap={2}>
        <CButton variant='secondary' onClick={handleCloseModal} sx={buttonSx}>
          Finalizar tour
        </CButton>
        <CButton onClick={handleClick} sx={buttonSx}>
          Seguir agora!
        </CButton>
      </Box>
    </ModalCard>
  )
}

export default GuideTourBannerFinished

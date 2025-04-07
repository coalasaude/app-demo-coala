import { Box } from '@mui/system'
import {
  AccountCircleOutlined,
  HelpOutline,
  KeyboardArrowDown,
  Logout,
  WhatsApp,
} from '@mui/icons-material'
import { Typography } from '@mui/material'

import { WebViewManager } from '@/services/WebView'
import { CMenu, CAvatar } from '@/v3/presentation/newComponents'
import useMediaQuery from '@/hooks/useMediaQuery'
import { CBreadcrumbs } from '@/v3/presentation/newComponents'
import { NovuNotification } from '@/v3/presentation/components/NovuNotification/NovuNotification'
import { InstagramButton } from '@/components/Template/AuthTemplate/Navbar/InstagramButton'

import { CNavbar } from '../CNavbar/CNavbar'

import { StyledNavBar } from './styles'

export interface CNavbarTopProps {
  children?: React.ReactNode
  toggleSidebar?: () => void
  isOpenedSidebar: boolean
  imageUrl?: string
}
export const CNavbarTop: React.FC<CNavbarTopProps> = ({
  toggleSidebar,
  isOpenedSidebar,
}) => {
  const isSmallDevice = useMediaQuery('sm')


  if (isSmallDevice)
    return <CNavbar toggleSidebar={toggleSidebar} isOpenedSidebar={isOpenedSidebar} />

  return (
    <StyledNavBar isOpen={Boolean(isOpenedSidebar)}>
      <Box display='flex' alignItems='center' id='sidebar-open' width='100%' ml={3}>
        <CBreadcrumbs />
      </Box>
      <Box display='flex' alignItems='center' justifyContent='flex-end' width='100%'>
        <InstagramButton />
        <Box p={1} mr={!isSmallDevice ? 1 : 0}>
          <NovuNotification />
        </Box>
        <Box mr={4}>
          <CMenu
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            actionComponent={
              <Box display='flex' alignItems='center' gap={1} sx={{ cursor: 'pointer' }}>
                <CAvatar type='photo' imageUrl='/assets/svg/Coala.svg' size='medium' isClickable />
                <Typography sx={{ color: 'rgba(0, 0, 0, 0.76)' }}>Visitante</Typography>
                <KeyboardArrowDown />
              </Box>
            }
            items={[
              {
                children: (
                  <Box
                    display='flex'
                    alignItems='center'
                    width='100%'
                    gap={2}
                  >
                    <AccountCircleOutlined fontSize='medium' />
                    <Typography variant='body2'>Meus dados</Typography>
                  </Box>
                ),
              },
              {
                children: (
                  <Box
                    display='flex'
                    alignItems='center'
                    width='100%'
                    gap={2}
                    pr={2}
                    onClick={() => WebViewManager.open(process.env.SUPPORT_URL, '_blank')}
                    sx={{ cursor: 'pointer' }}
                  >
                    <HelpOutline fontSize='medium' />
                    <Typography variant='body2'>Central de ajuda</Typography>
                  </Box>
                ),
              },
              {
                children: (
                  <Box
                    display='flex'
                    alignItems='center'
                    width='100%'
                    gap={2}
                    onClick={() => WebViewManager.open(process.env.WHATSAPP_SUPPORT_URL, '_blank')}
                  >
                    <WhatsApp fontSize='medium' />
                    <Typography variant='body2'>Fale conosco</Typography>
                  </Box>
                ),
              },
              {
                children: (
                  <Box display='flex' alignItems='center' width='100%' gap={2}>
                    <Logout fontSize='medium' />
                    <Typography variant='body2'>Sair</Typography>
                  </Box>
                ),
              },
            ]}
          />
        </Box>
      </Box>
    </StyledNavBar>
  )
}

export default CNavbarTop

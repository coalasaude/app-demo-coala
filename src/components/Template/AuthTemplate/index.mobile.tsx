import { useRouter } from 'next/router'
import Link from 'next/link'
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'
import { useState } from 'react'
import {  Dialog, DialogContent, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import NeurologyIcon from 'public/assets/svg/HealthHistoric/Neurology.svg'
import CSideBar from '@/v3/presentation/newComponents/layout/CSideBar'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import {
  TSidebarItem,
  useSidebarConfig,
} from '@/v3/presentation/newComponents/layout/CSideBar/config'
import CLogo from '@/v3/presentation/newComponents/atoms/CLogo'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'
import CContainer from '@/v3/presentation/newComponents/layout/CContainer'
import CNavbarTop from '@/v3/presentation/newComponents/layout/CNavbarTop'
import { useHasPermission } from '@/hooks/useHasPermission'
import { Permissions } from '@/constants/permissions'

export * from './Content'
export * from './PageSubtitle'

interface ITemplate {
  children?: React.ReactNode
  openSidebar: boolean
  toggleSidebar: any
}

export const AuthenticatedTemplateMobile: React.FC<ITemplate> = ({
  children,
  openSidebar,
  toggleSidebar,
}) => {
  const { auth } = useAuth()
  const sidebarItems = useSidebarConfig()
  const router = useRouter()
  const disabledPaddingRoutes = ['/app/hello', '/app/forms']
  const disablePadding = disabledPaddingRoutes.some((page) => router.pathname.startsWith(page))
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false)
  const [currentVideoUrl, setCurrentVideoUrl] = useState('')
  const [canAddAppointment] = useHasPermission([Permissions.ADD_APPOINTMENT])


  const handleOpenVideoDialog = (videoUrl: any) => {
    setCurrentVideoUrl(videoUrl)
    setIsVideoDialogOpen(true)
  }

  const handleCloseVideoDialog = () => {
    setIsVideoDialogOpen(false)
    setCurrentVideoUrl('') 
  }


  const sideBarFooterItems: TSidebarItem[] = [
    {
      name: 'PEI/PDI',
      onClick: () => handleOpenVideoDialog('/assets/videoplayback.mp4'),
      route: () =>
        bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.VIEW.bindPath, {
          userId: auth.user?.id,
        }),
      icon: InsightsOutlinedIcon,
      isActive: (route) =>
        route.includes(
          bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.VIEW.bindPath, {
            userId: auth.user?.id,
          }),
        ),
      hasPermission: () => true,
    },
    {
      name: 'Laudos e validação',
      onClick: () => handleOpenVideoDialog('/assets/videoplayback.mp4'),
      route: () => '',
      isActive: () => false,
      icon: ReceiptLongOutlinedIcon,
      hasPermission: () => true,
    },
    {
      name: 'Depoimentos',
      onClick: () => handleOpenVideoDialog('/assets/videoplayback.mp4'),
      route: () => '',
      isActive: () => false,
      icon: VideocamOutlinedIcon,
      hasPermission: () => true,
    },
  ]

  const logoVariant = openSidebar ? 'brand' : 'symbol'

  return (
    <>
      <CNavbarTop toggleSidebar={toggleSidebar} isOpenedSidebar={openSidebar} />
      <CSideBar
        isOpen={openSidebar}
        toggleSidebar={toggleSidebar}
        sidebarItems={sidebarItems}
        auth={auth}
        topSection={
          <Link href='/app/hello'>
            <CLogo variant={logoVariant} size={32} />
          </Link>
        }
        showEmergencyButton={canAddAppointment}
        sidebarFooterItems={sideBarFooterItems}
      />
      <CContainer id='container' disablePadding={disablePadding}>
        {children}
      </CContainer>
      <Dialog
              open={isVideoDialogOpen}
              onClose={handleCloseVideoDialog}
              maxWidth="lg" 
              fullWidth 
              aria-labelledby="video-dialog-title"
            >
              <IconButton
                aria-label="close"
                onClick={handleCloseVideoDialog}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                  zIndex: 1 
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogContent sx={{ padding: 0, lineHeight: 0 }}> 
                {currentVideoUrl && (
                  <video
                    width="100%" 
                    height="auto"
                    controls 
                    autoPlay  
                    key={currentVideoUrl}
                  >
                    <source src={currentVideoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </DialogContent>
            </Dialog>
    </>
  )
}

export default AuthenticatedTemplateMobile

import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { useBreakpoint } from '@/hooks/useBreakpoints'
import CContainer from '@/v3/presentation/newComponents/layout/CContainer'
import CSideBar from '@/v3/presentation/newComponents/layout/CSideBar'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { useSidebarConfig } from '@/v3/presentation/newComponents/layout/CSideBar/config'
import CLogo from '@/v3/presentation/newComponents/atoms/CLogo'
import CNavbarTop from '@/v3/presentation/newComponents/layout/CNavbarTop'
import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'
import { useHasPermission } from '@/hooks/useHasPermission'
import { Permissions } from '@/constants/permissions'
import { AUTHENTICATED_ROUTES, ROUTES } from '@/constants/routes'
import { useParams } from '@/hooks/useParams'

import { SidebarWrapper } from './styles'
import AuthenticatedTemplateMobile from './index.mobile'

export * from './Content'
export * from './PageSubtitle'

interface ITemplate {
  children: React.ReactNode
}
export const AuthenticatedTemplate: React.FC<ITemplate> = ({ children }) => {
  const isSmallDevice = useBreakpoint('sm')
  const route = useRouter()
  const pages = ['/app/forms', '/app/hello']
  const homeRoute = `${ROUTES.MODULES.APP}${AUTHENTICATED_ROUTES.HELLO}`
  const disablePadding = pages.some((page) => route.pathname.startsWith(page))
  const isDesktop = useBreakpoint('lg', 'up')
  const { auth } = useAuth()
  const sidebarItems = useSidebarConfig()
  const { params } = useParams()
  const [openSidebar, setOpenSidebar] = useState<boolean>(isDesktop)
  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar)
  }
  const { user: userData } = useFetchReadUser({ userId: Number(auth.user?.id) })
  const [canAddAppointment] = useHasPermission([Permissions.ADD_APPOINTMENT])

  useEffect(() => {
    if (!openSidebar && params.openSidebar === true) toggleSidebar()

    if (!!openSidebar && params.openSidebar === false && !isDesktop) toggleSidebar()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.openSidebar])

  if (isSmallDevice) {
    return (
      <AuthenticatedTemplateMobile toggleSidebar={toggleSidebar} openSidebar={openSidebar}>
        {children}
      </AuthenticatedTemplateMobile>
    )
  }

  return (
    <SidebarWrapper isOpen={Boolean(openSidebar)}>
      <CSideBar
        isOpen={openSidebar}
        toggleSidebar={toggleSidebar}
        sidebarItems={sidebarItems}
        showEmergencyButton={canAddAppointment}
        auth={auth}
        scrollToTop={!!params.scrollToTop}
        topSection={
          openSidebar ? (
            <Box pl={1}>
              <Link href={homeRoute}>
                <CLogo variant='brand' size={32} />
              </Link>
            </Box>
          ) : (
            <Link href={homeRoute}>
              <Box
                sx={{
                  backgroundColor: 'var(--mui-palette-primary-main)',
                  display: 'flex',
                  borderRadius: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CLogo variant='symbol' size={32} color='white' />
              </Box>
            </Link>
          )
        }
      />
      <CNavbarTop
        toggleSidebar={toggleSidebar}
        isOpenedSidebar={openSidebar}
        imageUrl={userData?.image?.url}
      />
      <CContainer id='container' disablePadding={disablePadding}>
        {children}
      </CContainer>
    </SidebarWrapper>
  )
}

export default AuthenticatedTemplate

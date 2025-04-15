import { useRouter } from 'next/router'
import Link from 'next/link'
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'

import NeurologyIcon from 'public/assets/svg/HealthHistoric/Neurology.svg'
import CSideBar from '@/v3/presentation/newComponents/layout/CSideBar'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import {
  TSidebarItem,
  useSidebarConfig,
} from '@/v3/presentation/newComponents/layout/CSideBar/config'
import CLogo from '@/v3/presentation/newComponents/atoms/CLogo'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES, UNAUTHENTICATED_ROUTES } from '@/constants/routes'
import CContainer from '@/v3/presentation/newComponents/layout/CContainer'
import { CDialogue, useModalContext } from '@/v3/presentation/components/Modal'
import { WebViewManager } from '@/services/WebView'
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
  const { auth, logout } = useAuth()
  const sidebarItems = useSidebarConfig()
  const router = useRouter()
  const { handleModal } = useModalContext()
  const disabledPaddingRoutes = ['/app/hello', '/app/forms']
  const disablePadding = disabledPaddingRoutes.some((page) => router.pathname.startsWith(page))

  const [canAddAppointment] = useHasPermission([Permissions.ADD_APPOINTMENT])

  const handleLogout = () => {
    logout()
    router.push(UNAUTHENTICATED_ROUTES.LOGIN)
  }

  const handleLostData = () => {
    handleModal(
      <CDialogue
        title='Atenção!'
        confirmButtonLabel='Sim'
        cancelButtonLabel='Não'
        onConfirm={handleLogout}
        description={
          <span>
            Tem certeza que deseja <b>sair</b> da sua conta?
          </span>
        }
      />,
    )
  }

  const sideBarFooterItems: TSidebarItem[] = [
    {
      name: 'PEI/PDI',
      onClick: () =>
        router.push(
          bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.VIEW.bindPath, {
            userId: auth.user?.id,
          }),
        ),
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
      name: 'Capacit. de equipe',
      onClick: () => WebViewManager.open(process.env.SUPPORT_URL, '_blank'),
      route: () => '',
      isActive: () => false,
      icon: NeurologyIcon,
      hasPermission: () => true,
    },
    {
      name: 'Laudos e validação',
      onClick: () => WebViewManager.open(process.env.WHATSAPP_SUPPORT_URL, '_blank'),
      route: () => '',
      isActive: () => false,
      icon: ReceiptLongOutlinedIcon,
      hasPermission: () => true,
    },
    {
      name: 'Depoimentos',
      onClick: handleLostData,
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
    </>
  )
}

export default AuthenticatedTemplateMobile

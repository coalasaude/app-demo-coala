import {
  AssessmentOutlined,
  AutoGraphOutlined,
  HandshakeOutlined,
  // MonitorHeartOutlined,
  SvgIconComponent,
} from '@mui/icons-material'

import { AUTHENTICATED_ROUTES } from '@/constants/routes'
import { AuthState } from '@/v3/infra/services/AuthStorage'

import { target } from '../../../atoms/CJoyride/constants/target'

import { healthAssessMentSubRoutes } from './subRoutes'

export type TCampaingSidebarItem = {
  id?: string
  name: string
  route: (data: { institutionId?: number; networkId?: number }) => string
  isActive?: (route: string) => boolean
  icon: SvgIconComponent
  subRoutes?: TCampaingSidebarItem[]
  hasPermission?: (auth: AuthState) => boolean
  CustomComponent?: (...props: any) => JSX.Element
  onClick?: () => void
  itemColor?: string
  isNew?: boolean
}

export const useSidebarCampaingConfig = (): TCampaingSidebarItem[] => {
  return [
    // {
    //   id: target.coalaReports,
    //   name: 'Laudos',
    //   route: () => AUTHENTICATED_ROUTES.REPORTS,
    //   icon: MonitorHeartOutlined,
    //   isActive: (route) => route.includes(AUTHENTICATED_ROUTES.REPORTS),
    //   hasPermission: () => true,
    // },
    {
      id: target.coalaIEP,
      name: 'PEI e PDI',
      route: () => AUTHENTICATED_ROUTES.IEP,
      icon: AutoGraphOutlined,
      isActive: (route) => route.includes(AUTHENTICATED_ROUTES.IEP),
      hasPermission: () => true,
    },
    {
      id: target.coalaMediation,
      name: 'Mediação',
      route: () => AUTHENTICATED_ROUTES.MEDIATION,
      icon: HandshakeOutlined,
      isActive: (route) => route.includes(AUTHENTICATED_ROUTES.MEDIATION),
      hasPermission: () => true,
    },
    {
      id: target.coalaHealthAssessment,
      name: 'Testes',
      route: () => '',
      icon: AssessmentOutlined,
      isActive: (route) => route.includes(AUTHENTICATED_ROUTES.ANXIETY),
      hasPermission: () => true,
      subRoutes: healthAssessMentSubRoutes,
    },
  ]
}

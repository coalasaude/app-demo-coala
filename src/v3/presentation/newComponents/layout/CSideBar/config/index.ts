/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AddToQueue,
  BadgeOutlined,
  CorporateFare,
  DescriptionOutlined,
  HomeOutlined,
  SchoolOutlined,
  SpaOutlined,
  SvgIconComponent,
} from '@mui/icons-material'
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined'

import BrainIcon from '/public/assets/svg/BrainIcon.svg'
import HealthUnitIcon from '/public/assets/svg/healthUnitIcon.svg'

import { Permissions } from '@/constants/permissions'
import { AUTHENTICATED_ROUTES, NEW_ROUTES, ROUTES } from '@/constants/routes'
import { useBreakpoint } from '@/hooks/useBreakpoints'
import { AuthState } from '@/v3/infra/services/AuthStorage'

import { target } from '../../../atoms/CJoyride/constants/target'

export type TSidebarItem = {
  id?: string
  name: string
  route: (data: { institutionId?: number; networkId?: number }) => string
  isActive?: (route: string) => boolean
  icon: SvgIconComponent
  subRoutes?: TSidebarItem[]
  hasPermission?: (auth: AuthState) => boolean
  CustomComponent?: (...props: any) => JSX.Element
  onClick?: () => void
  itemColor?: string
  isNew?: boolean
  disabled?: boolean
}

export const useSidebarConfig = (): TSidebarItem[] => {

  return [
    {
      id: target.coalaSideBarUser,
      name: 'Usuários',
      disabled: true,
      route: () => '/',
      hasPermission: () => true,
      isActive: (route) => {
        return false
      },
      icon: FaceOutlinedIcon,
    },
    {
      name: 'Organizações',
      route: () => '/',
      isActive: (route) => route.includes(AUTHENTICATED_ROUTES.ORGANIZATION),
      icon: CorporateFare,
      disabled: true,
      hasPermission: () => true,
    },
    {
      id: target.coalaSideBarCourse,
      name: 'Área de ensino',
      route: () => '/',
      icon: SchoolOutlined,
      disabled: true,
      isActive: (route) => route.includes(AUTHENTICATED_ROUTES.COURSE),
      hasPermission: () => true,
    },
    {
      id: target.coalaMaterials,
      name: 'Materiais',
      route: () => '/',
      icon: DescriptionOutlined,
      disabled: true,
      isActive: (route) => route.includes(AUTHENTICATED_ROUTES.MATERIALS),
      hasPermission: () => true,
    },
    {
      id: target.coalaOccupationalHealth,
      name: 'Saúde ocupacional',
      route: () => AUTHENTICATED_ROUTES.OCCUPATIONAL_HEALTH,
      icon: SpaOutlined,
      isActive: (route) => route.includes(AUTHENTICATED_ROUTES.OCCUPATIONAL_HEALTH),
      hasPermission: () => true,
      disabled: true,

    },
  ]
}

export const SidebarConfig = (): TSidebarItem[] => {
  const isSmallDevice = useBreakpoint('sm')
  return [
    {
      name: 'Início',
      route: () => AUTHENTICATED_ROUTES.HELLO,
      isActive: (route) => route.includes(AUTHENTICATED_ROUTES.HELLO),
      icon: HomeOutlined,
      hasPermission: (auth) => {
        if (isSmallDevice) {
          return false
        }

        const isChild = auth?.user?.isChild
        const hasResponsible = !!auth?.user?.responsible?.length
        if (isChild && hasResponsible) {
          return false
        }
        return true
      },
    },
    {
      name: 'Atendimentos',
      route: () => NEW_ROUTES.AUTHENTICATED.APPOINTMENT.path,
      isActive: (route) => route.includes(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.path),
      icon: AddToQueue,
      hasPermission: (auth) => {
        if (isSmallDevice) {
          return false
        }

        const hasPermissions = !!auth.permissions?.find(
          (p) => p.name === Permissions.VIEW_OTHER_APPOINTMENT
        )
        const isChild = auth?.user?.isChild
        const hasResponsible = !!auth?.user?.responsible?.length
        if ((isChild && hasResponsible) || !hasPermissions) {
          return false
        }
        return true
      },
    },
    {
      name: 'Usuários',
      route: () => NEW_ROUTES.AUTHENTICATED.USERS.ACCESS.path,
      hasPermission: () => true,
      isActive: (route) => false,
      icon: FaceOutlinedIcon,
    },
    {
      name: 'Ficha de saúde',
      route: () => NEW_ROUTES.AUTHENTICATED.USERS.ACCESS.HEALTH_HISTORIC.path,
      isActive: (route) =>
        route.includes(ROUTES.MODULES.APP + AUTHENTICATED_ROUTES.HEALTH_HISTORIC) ||
        route.includes(AUTHENTICATED_ROUTES.HEALTH_HISTORIC + ROUTES.MODULES.ACCESS),
      icon: BadgeOutlined,
      hasPermission: (auth) => {
        if (isSmallDevice) {
          return false
        }
        return (
          !!auth?.permissions?.find((p) => p.name === Permissions.MANAGE_HEALTH_HISTORY) ||
          Boolean(auth?.user?.hasFilledHealthHistory)
        )
      },
    },
    {
      name: 'Unidades de saúde',
      route: () => NEW_ROUTES.AUTHENTICATED.HEALTH_UNIT.path,
      isActive: (route) => route.includes(NEW_ROUTES.AUTHENTICATED.HEALTH_UNIT.path),
      icon: HealthUnitIcon,
      CustomComponent: HealthUnitIcon,
      hasPermission: (auth) => {
        const hasPermissions = auth.permissions?.some(
          (p) => p.name === Permissions.VIEW_HEALTH_UNIT
        )
        return Boolean(hasPermissions)
      },
    },
    {
      name: 'Organizações',
      route: () => AUTHENTICATED_ROUTES.ORGANIZATION,
      icon: CorporateFare,
      isActive: (route) => route.includes(AUTHENTICATED_ROUTES.ORGANIZATION),
      hasPermission: (auth) => {
        const hasPermissions = auth.permissions?.some(
          (p) => p.name === Permissions.VIEW_ORGANIZATIONS
        )
        return Boolean(hasPermissions)
      },
    },
    {
      name: 'Saúde mental',
      route: () => NEW_ROUTES.AUTHENTICATED.MENTAL_HEALTH.path,
      isActive: (route) => route.includes(NEW_ROUTES.AUTHENTICATED.MENTAL_HEALTH.path),
      CustomComponent: BrainIcon,
      icon: BrainIcon,
      hasPermission: () => false,
    },

    {
      name: 'Área de ensino',
      route: () => AUTHENTICATED_ROUTES.COURSE,
      icon: SchoolOutlined,
      isActive: (route) => route.includes(AUTHENTICATED_ROUTES.COURSE),
      hasPermission: (auth) => {
        const isChild = auth?.user?.isChild
        const hasResponsible = !!auth?.user?.responsible?.length

        if (isChild && hasResponsible) {
          return false
        }

        return true
      },
    },
    {
      name: 'Materiais',
      route: () => AUTHENTICATED_ROUTES.MATERIALS,
      icon: DescriptionOutlined,
      isActive: (route) => route.includes(AUTHENTICATED_ROUTES.MATERIALS),
      hasPermission: (auth) => {
        const isChild = auth?.user?.isChild
        const hasResponsible = !!auth?.user?.responsible?.length

        if (isChild && hasResponsible) {
          return false
        }

        return true
      },
    },
  ]
}

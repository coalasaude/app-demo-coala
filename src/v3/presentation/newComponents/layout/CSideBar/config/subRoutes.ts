import { DescriptionOutlined } from '@mui/icons-material'

import { AUTHENTICATED_ROUTES } from '@/constants/routes'

import { target } from '../../../atoms/CJoyride/constants'

import { TSidebarItem } from '.'

export const healthAssessMentSubRoutes: TSidebarItem[] = [
  {
    id: target.coalaAnxiety,
    name: 'Rastreio de ansiedade',
    route: () => AUTHENTICATED_ROUTES.ANXIETY,
    hasPermission: () => true,
    icon: DescriptionOutlined,
  },
  {
    id: target.coalaDepression,
    name: 'Rastreio de depressão',
    route: () => AUTHENTICATED_ROUTES.DEPRESSION,
    hasPermission: () => true,
    icon: DescriptionOutlined,
  },
  {
    id: target.coalaAutism,
    name: 'Rastreio de autismo',
    route: () => AUTHENTICATED_ROUTES.AUTISM,
    hasPermission: () => true,
    icon: DescriptionOutlined,
  },
  {
    id: target.coalaTherapy,
    name: 'Melhora com terapia',
    route: () => AUTHENTICATED_ROUTES.THERAPY,
    hasPermission: () => true,
    icon: DescriptionOutlined,
  },
]

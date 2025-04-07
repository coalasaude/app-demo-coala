import { Breadcrumbs, Link } from '@mui/material'
import { useRouter } from 'next/router'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

import { AUTHENTICATED_ROUTES, ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'

import { useActiveBreadcrumbRoutes } from './useCBreadcrumbs'

export interface CBreadcrumbsProps {
  variant?: 'text' | 'icon'
}

export const CBreadcrumbs = ({ variant = 'text' }: CBreadcrumbsProps) => {
  const { route, pathname, query } = useRouter()
  const routes = useActiveBreadcrumbRoutes()

  return (
    <Breadcrumbs
      aria-label='breadcrumb'
      sx={{ width: '100%' }}
      separator={variant === 'icon' ? <NavigateNextIcon fontSize='small' /> : undefined}
    >
      <Link
        underline='hover'
        typography='body1'
        color={
          route.includes(AUTHENTICATED_ROUTES.HELLO)
            ? 'var(--mui-palette-success-contrastText)'
            : 'var(--mui-palette-grey-500)'
        }
        href={`${ROUTES.MODULES.APP}${AUTHENTICATED_ROUTES.HELLO}`}
      >
        Home
      </Link>
      {routes?.map(({ name, path }) => {
        const isActive = pathname === path
        if (!name) return
        return (
          <Link
            key={name}
            underline='hover'
            typography='body1'
            color={
              isActive ? 'var(--mui-palette-success-contrastText)' : 'var(--mui-palette-grey-500)'
            }
            href={!!query ? bindPathParams(path, query) : path}
          >
            {name}
          </Link>
        )
      })}
    </Breadcrumbs>
  )
}

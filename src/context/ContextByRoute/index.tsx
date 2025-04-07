import { useRouter } from 'next/router'
import React from 'react'

import { AUTHENTICATED_ROUTES, NEW_ROUTES } from '@/constants/routes'

import { HealthHistoricProvider, StepsContext } from './HealthHistoricProvider'
import { AppointmentContext, AppointmentProvider } from './AppointmentProvider'

export const ContextRoutes: {
  route: string
  component: ({ children }: { children: React.ReactNode }) => JSX.Element
  context: React.Context<any>
}[] = [
  {
    route: AUTHENTICATED_ROUTES.HEALTH_HISTORIC,
    component: HealthHistoricProvider,
    context: StepsContext,
  },
  {
    route: NEW_ROUTES.AUTHENTICATED.APPOINTMENT.path,
    component: AppointmentProvider,
    context: AppointmentContext,
  },
]
export const ContextByRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const routeProps = ContextRoutes.find(({ route }) => router.pathname.includes(route))

  if (routeProps) {
    const Component = routeProps.component
    return <Component>{children}</Component>
  }

  return <>{children}</>
}

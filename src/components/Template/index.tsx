import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useActivateRedirect } from '@/v3/presentation/hooks/useActivateRedirect'
import useReloadWindow from '@/v3/presentation/hooks/useReloadWindow'

import { ApiFiltersController } from '../ApiFiltersController'

import { AuthenticatedTemplate } from './template.dynamic'

export interface ITemplate {
  children: React.ReactNode
  useLayout: (...keys: any) => any
  useContexts: (...keys: any) => any
}

export const Template = ({
  children,
  useLayout: CustomLayout,
  useContexts: CustomContexts,
}: ITemplate) => {
  const router = useRouter()
  const { onPreventTemporaryAccess, onPreventSurveyTemporaryAccess } = useActivateRedirect()
  useReloadWindow()

  useEffect(() => {
    onPreventTemporaryAccess()
    onPreventSurveyTemporaryAccess()
  }, [onPreventTemporaryAccess, onPreventSurveyTemporaryAccess])

  if (router.pathname.endsWith('/404')) return <>{children}</>

    if (CustomLayout) {
      return <CustomLayout>{children}</CustomLayout>
    }

    return (
      <>
          <ApiFiltersController />
          <AuthenticatedTemplate>
            {CustomContexts ? <CustomContexts>{children}</CustomContexts> : children}
          </AuthenticatedTemplate>
      </>
     
    )
  
  

}

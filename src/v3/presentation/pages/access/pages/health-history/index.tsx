import { useRouter } from 'next/router'

import { Permissions } from '@/constants/permissions'
import { AUTHENTICATED_ROUTES, NEW_ROUTES, ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { PageHeader } from '@/v3/presentation/newComponents'
import { useFetchAccess } from '@/v3/presentation/hooks/api/@v2/auth/useFetchGetAccess'

import { AccessSkeleton } from '../../components/AccessSkeleton/AccessSkeleton'
import { UserAccessList } from '../../components/UserAccessList/UserAccessList'

export const HealthHistoryAccessPage = () => {
  const router = useRouter()
  const { user, setAuth } = useAuth()

  const { data, isLoadingAccess } = useFetchAccess({
    permission: Permissions.MANAGE_HEALTH_HISTORY,
    userId: Number(user?.id),
  })

  const onClickDependent = (id?: number, isOnly?: boolean) => {
    if (id) {
      setAuth({
        selectedInstitution: undefined,
        selectedChildren: id,
        selfAccess: false,
      })
      if (isOnly) {
        router.replace(
          bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.HEALTH_HISTORIC.path, { userId: id })
        )
      } else {
        router.push(
          bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.HEALTH_HISTORIC.path, { userId: id })
        )
      }
    }
  }

  const onClickSelf = (id?: number, isOnly?: boolean) => {
    if (id) {
      setAuth({
        selectedInstitution: undefined,
        selectedChildren: undefined,
        selfAccess: true,
      })
      if (isOnly) {
        router.replace(
          bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.HEALTH_HISTORIC.path, { userId: id })
        )
      } else {
        router.push(
          bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.HEALTH_HISTORIC.path, { userId: id })
        )
      }
    }
  }

  return (
    <>
      <PageHeader
        title='Ficha de saúde'
        onBack={() => router.push(`${ROUTES.MODULES.APP}${AUTHENTICATED_ROUTES.HELLO}`)}
      />
      {!isLoadingAccess ? (
        <UserAccessList
          title='Selecione qual ficha de saúde você deseja visualizar.'
          selfUser={data?.selfAccess ? user : undefined}
          dependentList={user?.children || []}
          onClickSelf={onClickSelf}
          onClickDependent={onClickDependent}
        />
      ) : (
        <AccessSkeleton />
      )}
    </>
  )
}

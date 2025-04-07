import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Permissions } from '@/constants/permissions'
import { NEW_ROUTES } from '@/constants/routes'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { PageHeader } from '@/v3/presentation/newComponents'
import { bindPathParams } from '@/utils/bindParams'
import { useFetchAccess } from '@/v3/presentation/hooks/api/@v2/auth/useFetchGetAccess'

import { AccessSkeleton } from '../../components/AccessSkeleton/AccessSkeleton'
import { UserAccessList } from '../../components/UserAccessList/UserAccessList'

export const AppointmentAccessPage = () => {
  const router = useRouter()
  const { setAuth, user } = useAuth()
  const { data, isLoadingAccess } = useFetchAccess({
    permission: Permissions.VIEW_APPOINTMENT,
    userId: Number(user?.id),
  })

  const onClickDependent = (id?: number) => {
    if (id) {
      router.push(
        bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.APPOINTMENT.path, {
          userId: id,
        })
      )
    }
  }

  const onClickSelf = (id?: number) => {
    if (id) {
      router.push(
        bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.APPOINTMENT.path, {
          userId: id,
        })
      )
    }
  }

  const onClickInstitution = (institutionId?: number) => {
    if (institutionId) {
      router.push(
        `${NEW_ROUTES.AUTHENTICATED.APPOINTMENT.LIST.path}?institutionId=${institutionId}`,
      )
    }
  }

  const onClickAll = (id?: number) => {
    if (id) {
      router.push(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.LIST.path)
    }
  }

  useEffect(() => {
    setAuth({
      selectedInstitution: undefined,
      selectedChildren: undefined,
      selfAccess: false,
    })
  }, [setAuth])

  return (
    <>
      <PageHeader
        title='Pronto atendimento'
        onBack={() => router.push(NEW_ROUTES.AUTHENTICATED.HELLO.path)}
      />
      {!isLoadingAccess ? (
        <>
          <UserAccessList
            isAdmin={data?.isAdmin}
            selfUser={data?.selfAccess ? user : undefined}
            dependentList={user?.children}
            institutionList={data?.institutions || []}
            onClickSelf={onClickSelf}
            onClickDependent={onClickDependent}
            onClickInstitution={onClickInstitution}
            onClickAll={onClickAll}
            cardAllTitle='Fila de atendimentos'
            allSectionLabel='Todos os atendimentos'
            title='Selecione os atendimentos que deseja visualizar:'
          />
        </>
      ) : (
        <AccessSkeleton />
      )}
    </>
  )
}

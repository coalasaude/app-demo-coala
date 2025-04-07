import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined'
import { Typography } from '@mui/material'

import { Permissions } from '@/constants/permissions'
import { AUTHENTICATED_ROUTES, NEW_ROUTES, ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { PageHeader } from '@/v3/presentation/newComponents'
import { useFetchAccess } from '@/v3/presentation/hooks/api/@v2/auth/useFetchGetAccess'

import { AccessSkeleton } from '../../components/AccessSkeleton/AccessSkeleton'
import { UserAccessList } from '../../components/UserAccessList/UserAccessList'

export const UserAccessPage = () => {
  const router = useRouter()
  const { setAuth, user } = useAuth()
  const { data, isLoadingAccess } = useFetchAccess({
    permission: Permissions.VIEW_USERS,
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
        router.replace(bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.VIEW.bindPath, { userId: id }))
      } else {
        router.push(bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.VIEW.bindPath, { userId: id }))
      }
    }
  }

  const onClickSelf = (id?: number, isOnly?: boolean) => {
    if (id) {
      //TODO: remove this context on future
      setAuth({
        selectedInstitution: undefined,
        selectedChildren: undefined,
        selfAccess: true,
      })
      if (isOnly) {
        router.replace(bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.VIEW.bindPath, { userId: id }))
      } else {
        router.push(bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.VIEW.bindPath, { userId: id }))
      }
    }
  }

  const onClickInstitution = (id?: number, isOnly?: boolean) => {
    if (id) {
      setAuth({
        selectedInstitution: id,
        selectedChildren: undefined,
        selfAccess: false,
      })
      if (isOnly) {
        router.replace(`${NEW_ROUTES.AUTHENTICATED.USERS.LIST.path}?institutionId=${id}`)
      } else {
        router.push(`${NEW_ROUTES.AUTHENTICATED.USERS.LIST.path}?institutionId=${id}`)
      }
    }
  }

  const onClickAll = (id?: number) => {
    if (id) {
      setAuth({
        selectedInstitution: undefined,
        selectedChildren: undefined,
        selfAccess: false,
      })
      router.replace(NEW_ROUTES.AUTHENTICATED.USERS.LIST.path)
    }
  }

  const onClickProfiles = () => {
    router.push(NEW_ROUTES.AUTHENTICATED.USERS.PROFILES.path)
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
        title='Usuários'
        onBack={() => router.push(`${ROUTES.MODULES.APP}${AUTHENTICATED_ROUTES.HELLO}`)}
        secondaryButtonProps={
          data?.isAdmin
            ? {
                variant: 'text',
                notUsePortal: true,
                children: (
                  <>
                    <FaceOutlinedIcon />
                    <Typography
                      variant='h6'
                      sx={{ color: 'var(--md-palette-primary-main)' }}
                      ml={1}
                    >
                      Perfis de acesso
                    </Typography>
                  </>
                ),
                onClick: onClickProfiles,
              }
            : undefined
        }
      />
      {!isLoadingAccess ? (
        <>
          <UserAccessList
            isAdmin={data?.isAdmin}
            selfUser={user}
            dependentList={user?.children || []}
            institutionList={data?.institutions}
            onClickSelf={onClickSelf}
            onClickDependent={onClickDependent}
            onClickInstitution={onClickInstitution}
            onClickAll={onClickAll}
            cardAllTitle='Todos os usuários'
            allSectionLabel='Todos os usuários'
            title='Selecione os usuários que deseja visualizar:'
          />
        </>
      ) : (
        <AccessSkeleton />
      )}
    </>
  )
}

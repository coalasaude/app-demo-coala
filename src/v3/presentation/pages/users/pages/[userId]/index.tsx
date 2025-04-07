import { Skeleton } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Permissions } from '@/constants/permissions'
import { NEW_ROUTES } from '@/constants/routes'
import { useHasPermission } from '@/hooks/useHasPermission'
import { bindPathParams } from '@/utils/bindParams'
import SectionContainer from '@/v3/presentation/components/SectionContainer'
import { UserProfileCard, getActiveByPath } from '@/v3/presentation/components/UserCard'
import { useFetchBrowseBodyMass } from '@/v3/presentation/hooks/api/@v2/health-history/body-mass/useFetchBrowseBodyMass'
import { useFetchReadGeneralInformation } from '@/v3/presentation/hooks/api/@v2/health-history/general-information/useFetchReadGeneralInformation'
import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { PageHeader } from '@/v3/presentation/newComponents'
import { useHealthHistoryAccess } from '@/v3/presentation/hooks/useHealthHistoryAccess'

import { SectionAppointment } from '../../components/SectionAppointment'
import { SectionChildren } from '../../components/SectionChildren'
import { SectionHealthHistory } from '../../components/SectionHealthHistory'
import { SectionPersonalData } from '../../components/SectionPersonalData'
import { SectionProfile } from '../../components/SectionProfile'
import { SectionResponsible } from '../../components/SectionResponsible'
import SectionLearning from '../../components/SectionLearning/SectionLearning'

export const UserViewPage = () => {
  const router = useRouter()
  const { auth, setAuth } = useAuth()

  const userId = Number(router.query.userId as string)
  const section = (router.query.section as string[])?.[0]

  const { user, isPending: isLoadingUser, refetch, isError } = useFetchReadUser({ userId })
  const { generalInformation } = useFetchReadGeneralInformation({ userId })
  const { bodyMass } = useFetchBrowseBodyMass({ userId })
  const [canUpdateUser] = useHasPermission([Permissions.UPDATE_USER])
  const canUseHealthHistory = useHealthHistoryAccess({ userId })

  const handleEditProfileCard = () => {
    router.push(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.EDIT.GENERAL_DATA.path, {
        userId: userId,
      }),
    )
  }

  const isSameUser = auth.userId === userId
  const isChildren = user?.responsible.some((responsible) => responsible.id === userId)

  useEffect(() => {
    const selectedChildren = isChildren ? userId : undefined

    setAuth({
      selectedChildren: isSameUser ? undefined : selectedChildren,
      selfAccess: isSameUser,
      selectedInstitution: undefined,
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setAuth, user?.responsible, userId])

  if (isError) router.push(NEW_ROUTES.AUTHENTICATED.HELLO.path)

  const canUpdateUserInfo = canUpdateUser || isSameUser || isChildren

  return (
    <>
      <PageHeader title={isSameUser ? 'Meus dados' : 'Usuários'} onBack={() => router.back()} />
      {!user?.id || isLoadingUser ? (
        <>
          <Skeleton variant='rectangular' height={200} />
          <Skeleton variant='rectangular' height={300} />
        </>
      ) : (
        <>
          <UserProfileCard
            user={user}
            userGeneralInformation={generalInformation}
            userBodyMass={bodyMass?.data[0]}
            onEdit={canUpdateUserInfo ? handleEditProfileCard : undefined}
          />
          <SectionContainer activeStep={section}>
            <SectionPersonalData
              user={user}
              canUpdateUser={!!canUpdateUserInfo}
              key={getActiveByPath(NEW_ROUTES.AUTHENTICATED.USERS.VIEW.path)}
            />
            {(canUseHealthHistory || (isSameUser && auth.user?.hasFilledHealthHistory)) && (
              <SectionHealthHistory
                user={user}
                key={getActiveByPath(NEW_ROUTES.AUTHENTICATED.USERS.HEALTH_HISTORIC.path)}
              />
            )}
            <SectionProfile
              user={user}
              refetch={refetch}
              key={getActiveByPath(NEW_ROUTES.AUTHENTICATED.USERS.PROFILE.path)}
            />
            <SectionAppointment
              user={user}
              key={getActiveByPath(NEW_ROUTES.AUTHENTICATED.USERS.APPOINTMENT.path)}
            />
            {user?.isChild ? (
              <SectionResponsible
                user={user}
                key={getActiveByPath(NEW_ROUTES.AUTHENTICATED.USERS.RESPONSIBLE.path)}
              />
            ) : null}
            {!user?.isChild || user.children.length > 0 ? (
              <SectionChildren
                user={user}
                key={getActiveByPath(NEW_ROUTES.AUTHENTICATED.USERS.DEPENDENT.path)}
              />
            ) : null}
            {user.isChild && user.isFacultativeAccess() ? (
              <SectionLearning
                key={getActiveByPath(NEW_ROUTES.AUTHENTICATED.USERS.LEARNING.path)}
                user={user}
              />
            ) : null}
          </SectionContainer>
        </>
      )}
    </>
  )
}

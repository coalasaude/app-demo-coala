import Router from 'next/router'

import { GridItem, GridWrapper } from '@/components/Grid'
import { Permissions } from '@/constants/permissions'
import { NEW_ROUTES } from '@/constants/routes'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { useHasPermission } from '@/hooks/useHasPermission'
import { bindPathParams } from '@/utils/bindParams'
import { UserModel } from '@/v3/domain/@v2/users/users.model'
import { NotFound } from '@/v3/presentation/components/NotFound'
import Paper from '@/v3/presentation/components/Paper'

import { UserInfoSection } from '../UserInfoContainer'

import { ProfileCard } from './ProfileCard'

export const SectionProfile = ({ user, refetch }: { user: UserModel; refetch: () => void }) => {
  const { setAuth } = useAuth()
  const [canAddProfile, canUpdateProfile, hasUpdateHealthLeader] = useHasPermission([
    Permissions.MANAGE_ROLE,
    Permissions.MANAGE_ROLE,
    Permissions.UPDATE_HEALTH_LEADER,
  ])
  const roles = user?.roles
  const userId = String(Router.query.userId)

  const handleAddProfile = () => {
    if (!canAddProfile) {
      return undefined
    }

    setAuth({
      selectedInstitution: undefined,
    })

    Router.push(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.ADD.PROFILE.path, {
        userId: userId,
      })
    )
  }

  const handleEditProfile = (userProfileId: number, institutionId?: number) => {
    if (!canAddProfile) {
      return undefined
    }

    setAuth({
      selectedInstitution: institutionId,
    })

    Router.push(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.EDIT.PROFILE.path, {
        userId: userId,
        userProfileId,
      })
    )
  }

  return (
    <Paper noBorder sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <UserInfoSection
        title='Perfis'
        onEdit={handleAddProfile}
        variant={canAddProfile ? 'text' : 'onlyTitle'}
        buttonVariant='contained'
      >
        {!!roles?.length ? (
          <GridWrapper>
            <>
              {roles.map((role) => {
                return (
                  <GridItem xs={12} md={4} key={role.id}>
                    <ProfileCard
                      refetchUser={refetch}
                      role={role}
                      canUpdateHealthLeader={hasUpdateHealthLeader}
                      onClick={canUpdateProfile ? handleEditProfile : undefined}
                    />
                  </GridItem>
                )
              })}
            </>
          </GridWrapper>
        ) : (
          <NotFound mt={3} text='Não há perfis para este usuário' />
        )}
      </UserInfoSection>
    </Paper>
  )
}

export default SectionProfile

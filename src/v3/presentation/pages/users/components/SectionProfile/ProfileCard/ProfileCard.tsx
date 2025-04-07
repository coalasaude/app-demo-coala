import EditIcon from '@mui/icons-material/EditOutlined'
import { Stack, Typography } from '@mui/material'

import InstitutionAvatar from '/public/assets/svg/InstitutionAvatar.svg'
import CoalaAvatar from '/public/assets/svg/User/CoalaAvatar.svg'

import { GridItem, GridWrapper } from '@/components/Grid'
import { Profile } from '@/v3/domain/Profile'
import { CContainerContent } from '@/v3/presentation/newComponents'
import { RoleModel } from '@/v3/domain/@v2/users/role/role.model'

import { HealthLeaderComponent } from '../HealthLeader'

import { ProfileCardText } from './ProfileCardText'

export const ProfileCard = ({
  role,
  onClick,
  canUpdateHealthLeader,
  refetchUser,
  canUpdateProfile,
}: {
  role: RoleModel
  refetchUser: () => void
  canUpdateHealthLeader?: boolean
  onClick?: (roleId: number, institutionId?: number) => void
  canUpdateProfile?: boolean
}) => {
  const profile = role.profile
  const SVG = !role.institution?.fantasyName ? CoalaAvatar : InstitutionAvatar
  const fantasyName = role.institution?.getFantasyName()
  const institutionName = fantasyName ? fantasyName : 'Coala Saúde'
  const profileName = profile?.getProfileTypeName()

  const isMedical = Profile.getIsMedicalByProfileType(profile?.type)
  const isAdmin = Profile.getIsAdminByProfileName(profile?.name)
  const isStudent = Profile.getIsDependentByProfileName(profile?.name)
  const isManager = !isMedical && !isAdmin && !isStudent

  return (
    <CContainerContent
      hover={!!onClick}
      onClick={() => onClick?.(role.id, role.institution?.id)}
      withDivider={!isAdmin}
      icon={
        canUpdateProfile ? (
          <EditIcon sx={{ width: 20, height: 20, color: 'grey.600' }} />
        ) : undefined
      }
      title={
        <Typography variant='h5' mb={-0.5}>
          {institutionName}
        </Typography>
      }
      subtitle={
        <Typography variant='caption' color={'var(--mui-palette-info-main)'}>
          {profileName}
        </Typography>
      }
      startComponent={<SVG style={{ width: 42, marginBottom: -4, marginLeft: -1 }} />}
    >
      {!isAdmin ? (
        <>
          {isManager && (
            <Stack spacing={1}>
              {role.companyPosition?.name && (
                <ProfileCardText label='Cargo' value={role.companyPosition?.name} />
              )}
              <HealthLeaderComponent
                institutionId={role.institution?.id as unknown as number}
                isHealthLeader={!!role.isHealthLeader}
                hasUpdateHealthLeader={!!canUpdateHealthLeader}
                refetch={refetchUser}
                roleId={role.id as unknown as number}
              />
            </Stack>
          )}
          {isMedical && (
            <GridWrapper>
              <GridItem xs={6}>
                <ProfileCardText label='Cargo' value={role.profile?.name} />
              </GridItem>
              <GridItem xs={6}>
                <ProfileCardText label='Registro' value={role?.healthRegister} />
              </GridItem>
            </GridWrapper>
          )}
          {isStudent && (
            <GridWrapper>
              <GridItem xs={3}>
                <ProfileCardText label='Matrícula' value={role.enrollment} />
              </GridItem>
              <GridItem xs={3}>
                <ProfileCardText label='Segmento:' value={role?.educationalStage?.abbreviation} />
              </GridItem>
              <GridItem xs={3}>
                <ProfileCardText
                  label='Série:'
                  value={role?.schoolGrade?.name ? `${role?.schoolGrade?.name}` : '-'}
                />
              </GridItem>
              <GridItem xs={3}>
                <ProfileCardText label='Turma:' value={role?.class} />
              </GridItem>
            </GridWrapper>
          )}
        </>
      ) : null}
    </CContainerContent>
  )
}

export default ProfileCard

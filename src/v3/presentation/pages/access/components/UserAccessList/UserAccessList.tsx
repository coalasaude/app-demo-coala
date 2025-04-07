import { Box } from '@mui/material'
import { useEffect } from 'react'
import ThreePOutlinedIcon from '@mui/icons-material/ThreePOutlined'

import { CBaseContainer } from '@/v3/presentation/newComponents/layout/CBaseContainer/CBaseContainer'
import { UserModel } from '@/v3/domain/@v2/users/users.model'
import { RelativeModel } from '@/v3/domain/@v2/users/relative.model'
import { InstitutionModel } from '@/v3/domain/@v2/users/insitution.model'
import { target } from '@/v3/presentation/newComponents/atoms/CJoyride/constants'

import { UserAccessCards } from './UserAccessCards'
export type UserAccessListProps = {
  title?: string
  selfUser?: UserModel
  dependentList?: RelativeModel[]
  institutionList?: InstitutionModel[]
  onClickDependent?: (id?: number) => void
  onClickSelf?: (id?: number, isOnly?: boolean) => void
  onClickInstitution?: (id?: number, isOnly?: boolean) => void
  isAdmin?: boolean
  allSectionLabel?: string
  onClickAll?: () => void
  cardAllTitle?: string
}

export const UserAccessList = ({
  title,
  onClickSelf,
  onClickInstitution,
  selfUser,
  institutionList,
  dependentList,
  onClickDependent,
  isAdmin,
  allSectionLabel,
  onClickAll,
  cardAllTitle,
}: UserAccessListProps) => {
  const showSelfUser = !!selfUser?.id && !!onClickSelf
  const showDependents = !!dependentList?.length && !!onClickDependent
  const showInstitution = !!institutionList?.length && !!onClickInstitution
  useEffect(() => {
    const onlySelf = !showDependents && !showInstitution && showSelfUser

    if (!isAdmin) {
      const onlyInstitution =
        !showDependents && showInstitution && !showSelfUser && institutionList?.length === 1

      if (onlySelf) {
        onClickSelf(selfUser?.id, true)
      }

      if (onlyInstitution) {
        onClickInstitution(institutionList[0].id, true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CBaseContainer data-testid='UserAccessCards' title={title}>
      {isAdmin && (
        <UserAccessCards
          title={allSectionLabel || ''}
          mb={2}
          gridItemDesktop={4}
          options={[
            {
              id: 0,
              title: cardAllTitle || '',
              subtitle: 'Administrador',
              onClick: onClickAll,
              ImageComponent: <ThreePOutlinedIcon sx={{ width: '32px', height: '32px' }} />,
              cardProps: { sx: { backgroundColor: 'var(--mui-palette-grey-100)' } },
            },
          ]}
        />
      )}
      {showInstitution && (
        <div id={target.coalaUserAccessCard}>
          <UserAccessCards
            title='Instituições:'
            mb={2}
            gridItemDesktop={3}
            options={institutionList.map((institution) => ({
              id: institution.id,
              title: institution.getFantasyName(),
              onClick: () => onClickInstitution(institution.id),
            }))}
          />
        </div>
      )}
      <Box display='flex' width='100%' gap='16px' flexDirection={{ xs: 'column', md: 'row' }}>
        {showDependents && (
          <UserAccessCards
            title='Dependentes:'
            mb={2}
            width='100%'
            gridItemDesktop={12}
            options={dependentList.map((user) => ({
              id: user.id,
              title: user.getFullName(),
              subtitle: user.getFormattedGenderAndAge(),
              imageUrl: user?.image?.url,
              onClick: () => onClickDependent(user.id),
            }))}
          />
        )}
        {showSelfUser && (
          <UserAccessCards
            title='Meus dados:'
            mb={2}
            gridItemDesktop={12}
            width='100%'
            options={[
              {
                id: selfUser.id,
                title: selfUser.getFullName(),
                subtitle: selfUser.getFormattedGenderAndAge(),
                imageUrl: selfUser?.image?.url,
                onClick: () => onClickSelf(selfUser.id),
              },
            ]}
          />
        )}
      </Box>
    </CBaseContainer>
  )
}

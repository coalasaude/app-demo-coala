import { Paper } from '@mui/material'
import { useRouter } from 'next/router'

import { GridItem, GridWrapper } from '@/components/Grid'
import { Permissions } from '@/constants/permissions'
import { NEW_ROUTES } from '@/constants/routes'
import { useHasPermission } from '@/hooks/useHasPermission'
import { bindPathParams } from '@/utils/bindParams'
import { CDialogue, useModalContext } from '@/v3/presentation/components/Modal'
import { NotFound } from '@/v3/presentation/components/NotFound'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { UserModel } from '@/v3/domain/@v2/users/users.model'
import { useMutateDeleteResponsible } from '@/v3/presentation/hooks/api/@v2/users/users/useMutateDeleteResponsible'

import { UserInfoSection } from '../UserInfoContainer'

import { CardEndComponentIcon } from './components/CardEndComponentIcon'
import { ResponsibleCard } from './components/ResponsibleCard'

export const SectionResponsible = ({ user }: { user: UserModel }) => {
  const router = useRouter()
  const { setAuth, user: loggedUser } = useAuth()
  const [canManageRole] = useHasPermission([Permissions.MANAGE_ROLE])
  const { mutateAsync: removeResponsibleFromDependent } = useMutateDeleteResponsible()
  const { handleModal } = useModalContext()

  const handleAddResponsible = () => {
    router.push(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.ADD.RESPONSIBLE.path, {
        userId: user.id,
      }),
    )
  }

  const handleRedirectToResponsible = (id?: number) => {
    setAuth({
      selectedChildren: id,
      selectedInstitution: undefined,
      selfAccess: false,
    })

    router.push(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.VIEW.bindPath, {
        userId: id,
      }),
    )
  }

  const onDelete = (e: any, responsibleId?: number) => {
    e.stopPropagation()
    handleModal(
      <CDialogue
        confirmButtonLabel='Sim'
        cancelButtonLabel='Não'
        onConfirm={async () => {
          if (responsibleId)
            await removeResponsibleFromDependent({
              childrenId: user.id,
              responsibleId: Number(responsibleId),
            })
        }}
        title='Atenção'
        description={`Você tem certeza que deseja remover o vinculo do aluno ${user.name} com este responsável?`}
      />,
    )
  }

  const cardEndComponent = (responsibleId?: number) => {
    if (canManageRole && user?.responsible?.length > 1 && responsibleId) {
      return <CardEndComponentIcon onDelete={onDelete} responsibleId={responsibleId} />
    }
  }

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        boxShadow: 'none',
        border: 'none',
      }}
    >
      <UserInfoSection
        title='Responsáveis'
        buttonVariant='contained'
        variant={canManageRole ? 'text' : 'onlyTitle'}
        onEdit={handleAddResponsible}
      >
        {user?.responsible?.length > 0 ? (
          <GridWrapper>
            {user.responsible.map((responsible) => {
              const isSameUser = responsible.id === loggedUser?.id
              const canClickCard =
                (!loggedUser?.isOnlyResponsible() && !loggedUser?.isChild) || isSameUser

              return (
                <GridItem xs={12} md={6} key={responsible.id}>
                  <ResponsibleCard
                    responsible={responsible}
                    endComponent={cardEndComponent(responsible.id)}
                    canClickCard={canClickCard}
                    onClickCard={handleRedirectToResponsible}
                  />
                </GridItem>
              )
            })}
          </GridWrapper>
        ) : (
          <NotFound mt={4} text='Não foram encontrados responsáveis para este usuário' />
        )}
      </UserInfoSection>
    </Paper>
  )
}

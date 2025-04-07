import { useRouter } from 'next/router'

import { GridItem, GridWrapper } from '@/components/Grid'
import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { UserModel } from '@/v3/domain/@v2/users/users.model'
import { AvatarInfo } from '@/v3/presentation/components/AvatarInfo'
import { NotFound } from '@/v3/presentation/components/NotFound'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { CContainerContent, CDisplayRecord, CDivider } from '@/v3/presentation/newComponents'
import Paper from '@/v3/presentation/components/Paper'

import { UserInfoSection } from '../UserInfoContainer'

export const SectionChildren = ({ user }: { user: UserModel }) => {
  const router = useRouter()
  const { setAuth, user: loggedUser } = useAuth()
  const isAdmin = loggedUser?.isAdmin

  const handleRedirectToDependent = (id?: number) => {
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

  const handleAddDependent = () => {
    router.push(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.ADD.DEPENDENT.path, {
        userId: user.id,
      }),
    )
  }

  return (
    <Paper noBorder sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <UserInfoSection
        title='Dependentes'
        buttonVariant='contained'
        variant={isAdmin ? 'text' : 'onlyTitle'}
        onEdit={handleAddDependent}
      >
        {user.children.length > 0 ? (
          <GridWrapper>
            {user.children.map((children) => (
              <GridItem xs={12} md={4} key={children.id}>
                <CContainerContent
                  title={children.getFullName()}
                  subtitle={
                    <CDisplayRecord
                      label='Instituição:'
                      value={children.getInstitutionNames() || '-'}
                      withDivider={false}
                      noWrap={true}
                      clickable
                      boxProps={{ sx: { display: 'flex', gap: 1 } }}
                      tooltipDescription={children.getInstitutionNames() || '-'}
                    />
                  }
                  sx={{ justifyContent: 'flex-start', gap: '8px' }}
                  hover
                  onClick={() => handleRedirectToDependent(children.id)}
                  startComponent={
                    <AvatarInfo
                      hideText
                      title={children.getFullName()}
                      imageUrl={children.image?.url}
                    />
                  }
                >
                  <CDivider />
                  <GridWrapper spacing={0} mt={1}>
                    <GridItem xs={7}>
                      <CDisplayRecord
                        label='Gênero'
                        value={children.genre}
                        withDivider={false}
                        clickable
                      />
                    </GridItem>
                    <GridItem>
                      <CDisplayRecord
                        label='Data de Nascimento'
                        value={children.getFormattedBirthday()}
                        withDivider={false}
                        clickable
                      />
                    </GridItem>
                  </GridWrapper>
                </CContainerContent>
              </GridItem>
            ))}
          </GridWrapper>
        ) : (
          <NotFound mt={4} text='Não foram encontrados dependentes para este usuário' />
        )}
      </UserInfoSection>
    </Paper>
  )
}

import { GridItem, GridWrapper } from '@/components/Grid'
import { CDisplayRecord } from '@/v3/presentation/newComponents'
import { UserModel } from '@/v3/domain/@v2/users/users.model'

import { UserInfoSection } from '../UserInfoSection'

type Props = {
  handleEditBasicInfo?: () => void
  handleEditLoginInfo?: () => void
  user?: UserModel
}

export const UserInfoBasic = ({ user, handleEditBasicInfo, handleEditLoginInfo }: Props) => {
  return (
    <>
      <UserInfoSection title='Informações pessoais' onEdit={handleEditBasicInfo}>
        <GridWrapper>
          <GridItem xs={12} md={4}>
            <CDisplayRecord withDivider label='Nome' value={user?.name} />
          </GridItem>
          <GridItem xs={12} md={4}>
            <CDisplayRecord withDivider label='Sobrenome' value={user?.lastName} />
          </GridItem>
          <GridItem xs={12} md={4}>
            <CDisplayRecord withDivider label='CPF' value={user?.getFormattedCPF()} />
          </GridItem>
        </GridWrapper>
      </UserInfoSection>
      {!user?.isChild && (
        <UserInfoSection title='Login' onEdit={handleEditLoginInfo}>
          <GridWrapper>
            <GridItem xs={12} md={4}>
              <CDisplayRecord withDivider label='E-mail' value={user?.email} />
            </GridItem>
            <GridItem xs={12} md={4}>
              <CDisplayRecord withDivider label='Telefone' value={user?.getFormattedPhone()} />
            </GridItem>
            <GridItem xs={12} md={4}>
              <CDisplayRecord withDivider label='Senha' value={user?.getPassword()} />
            </GridItem>
          </GridWrapper>
        </UserInfoSection>
      )}
    </>
  )
}

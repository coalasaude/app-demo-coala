import { GridItem, GridWrapper } from '@/components/Grid'
import { CDisplayRecord } from '@/v3/presentation/newComponents'
import { AddressModel } from '@/v3/domain/@v2/users/address.model'

import { UserInfoSection } from '../UserInfoSection'

export const UserInfoAddress = ({
  address,
  onEdit,
}: {
  address?: AddressModel | null
  onEdit?: () => void
}) => {
  return (
    <UserInfoSection title='Endereço' onEdit={onEdit}>
      <GridWrapper>
        <GridItem xs={12} md={4}>
          <CDisplayRecord withDivider label='CEP' value={address?.zipCode} />
        </GridItem>
        <GridItem xs={12} md={4}>
          <CDisplayRecord withDivider label='Cidade ' value={address?.city} />
        </GridItem>
        <GridItem xs={12} md={4}>
          <CDisplayRecord withDivider label='Estado' value={address?.state} />
        </GridItem>
        <GridItem xs={12} md={3}>
          <CDisplayRecord withDivider label='Bairro' value={address?.neighborhood} />
        </GridItem>
        <GridItem xs={12} md={3}>
          <CDisplayRecord withDivider label='Rua' value={address?.street} />
        </GridItem>
        <GridItem xs={6} md={3}>
          <CDisplayRecord withDivider label='Número' value={address?.number} />
        </GridItem>
        <GridItem xs={6} md={3}>
          <CDisplayRecord withDivider label='Complemento ' value={address?.complement} />
        </GridItem>
      </GridWrapper>
    </UserInfoSection>
  )
}

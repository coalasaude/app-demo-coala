import { CDisplayRecord, CDivider } from '@/v3/presentation/newComponents'
import { cnpjNormalizer } from '@/components/Forms/normalizers/cnpjNormalizer'
import { cepNormalizer } from '@/components/Forms'
import { GridItem, GridWrapper } from '@/components/Grid'
import { HealthUnitModel } from '@/v3/domain/@v2/health-units/health-unit/health-unit.model'

import { EditButton } from '../EditButton/EditButton'
import { EditSections } from '../../../../components/Form/Steps'
import { Container, Title, Group, Section } from '../Section'

type Props = {
  canEdit?: boolean
  data?: HealthUnitModel
}

export const Company = ({ data, canEdit }: Props) => {
  return (
    <Section p={2}>
      <Container>
        <Title
          content='Dados administrativos'
          icon={
            canEdit && <EditButton healthUnitId={data?.id} section={EditSections.ADMINISTRATIVE} />
          }
        />

        <Group>
          <GridWrapper>
            <GridItem xs={6} sm={4}>
              <CDisplayRecord
                withDivider={false}
                value={data?.company?.companyName}
                label='Razão Social'
              />
            </GridItem>
            <GridItem xs={6} sm={4}>
              <CDisplayRecord
                value={data?.company?.cnpj && cnpjNormalizer(data?.company?.cnpj)}
                label='CNPJ'
                withDivider={false}
              />
            </GridItem>
            <GridItem xs={6} sm={4}>
              <CDisplayRecord
                withDivider={false}
                value={data?.company?.name}
                label='Nome da unidade'
              />
            </GridItem>
          </GridWrapper>
        </Group>
      </Container>
      <CDivider />
      <Container>
        <Title
          content='Contatos'
          icon={canEdit && <EditButton healthUnitId={data?.id} section={EditSections.CONTACTS} />}
        />

        <Group>
          <GridWrapper>
            <GridItem xs={6} sm={4}>
              <CDisplayRecord value={data?.contact?.phone} label='Telefone' withDivider={false} />
            </GridItem>
            <GridItem xs={6} sm={4}>
              <CDisplayRecord
                value={data?.contact?.whatsapp}
                label='Whatsapp'
                withDivider={false}
              />
            </GridItem>
            <GridItem xs={6} sm={4}>
              <CDisplayRecord withDivider={false} value={data?.contact?.email} label='E-mail' />
            </GridItem>
          </GridWrapper>
        </Group>
      </Container>

      <CDivider />
      <Container>
        <Title
          content='Endereço'
          icon={canEdit && <EditButton healthUnitId={data?.id} section={EditSections.ADDRESS} />}
        />

        <Group>
          <GridWrapper>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord
                withDivider={false}
                value={data?.address?.zipCode && cepNormalizer(data?.address?.zipCode)}
                label='CEP'
              />
            </GridItem>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord withDivider={false} value={data?.address?.state} label='Estado' />
            </GridItem>

            <GridItem xs={6} sm={3}>
              <CDisplayRecord withDivider={false} value={data?.address?.city} label='Cidade' />
            </GridItem>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord
                withDivider={false}
                value={data?.address?.neighborhood}
                label='Bairro'
              />
            </GridItem>
          </GridWrapper>
        </Group>

        <Group>
          <GridWrapper>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord withDivider={false} value={data?.address?.street} label='Rua' />
            </GridItem>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord
                withDivider={false}
                value={data?.address?.number?.toString()}
                label='Número'
              />
            </GridItem>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord withDivider={false} value={data?.address?.block} label='Bloco' />
            </GridItem>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord
                withDivider={false}
                value={data?.address?.complement}
                label='Complemento'
              />
            </GridItem>
          </GridWrapper>
        </Group>
      </Container>
    </Section>
  )
}

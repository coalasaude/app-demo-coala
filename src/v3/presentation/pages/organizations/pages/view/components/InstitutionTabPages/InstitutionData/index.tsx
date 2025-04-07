import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import { NEW_ROUTES } from '@/constants/routes'
import { Container } from '@/v3/presentation/pages/health-unit/pages/view/styles'
import { Group, Title } from '@/v3/presentation/pages/health-unit/pages/view/components/Section'
import { GridItem, GridWrapper } from '@/components/Grid'
import { StyledDivider } from '@/v3/presentation/pages/health-unit/components/Form/NavigationButtons/styles'
import { cepNormalizer, phoneNormalizer } from '@/components/Forms'
import { cnpjNormalizer } from '@/components/Forms/normalizers/cnpjNormalizer'
import { Brand, DueDateType, Institution, Network } from '@/v3/domain/organizations/Organization'
import { capitalizeName } from '@/utils/capitalizeName'
import { EditButton } from '@/v3/presentation/components/EditButton/EditButton'
import { EditSections } from '@/v3/presentation/pages/organizations/constants/editSections'
import { OrganizationType } from '@/v3/presentation/pages/organizations/constants/organizationType'
import { formatURL } from '@/v3/utils/formatURL'
import HeaderButtonsPortal from '@/v3/presentation/components/PageHeader/HeaderButtonsPortal'
import { CDisplayRecord } from '@/v3/presentation/newComponents'

export const DueDateDescription: { [key in DueDateType]: string } = {
  [DueDateType.EVERY_DAY_5]: 'Todo dia 5',
  [DueDateType.EVERY_DAY_10]: 'Todo dia 10',
  [DueDateType.EVERY_DAY_15]: 'Todo dia 15',
  [DueDateType.EVERY_DAY_20]: 'Todo dia 20',
  [DueDateType.EVERY_DAY_25]: 'Todo dia 25',
  [DueDateType.EVERY_DAY_30]: 'Todo dia 30',
}

export enum CoverageExtensionType {
  COVERAGE = 'COVERAGE',
  EMERGENCY_CALLCENTER = 'EMERGENCY_CALLCENTER',
}

export const InstitutionDataTab = ({
  canUpdateInstitution,
  data,
  type,
}: {
  data: Brand | Network | Institution
  canUpdateInstitution: boolean
  type?: string
}) => {
  const router = useRouter()

  const institutionType = type === 'institution'

  const handleClick = (id: number, orgType: string, section: EditSections) => {
    const url = formatURL(NEW_ROUTES.AUTHENTICATED.ORGANIZATION.EDIT.path, {
      pathParams: {
        id: String(id),
        type: orgType,
      },
      queryParams: {
        section,
      },
    })

    router.push(url)
  }

  return (
    <>
      {institutionType && canUpdateInstitution && (
        <Box p={2} display='flex' alignItems='center' justifyContent='space-between'>
          <HeaderButtonsPortal>
            <Box display='flex' width='100%'>
              <Typography variant='h4'>Dados cadastrais</Typography>
            </Box>
          </HeaderButtonsPortal>
        </Box>
      )}
      <Container>
        <Title
          mt={institutionType ? 2 : 0}
          content='Dados administrativos'
          icon={
            canUpdateInstitution && (
              <EditButton
                onClick={() =>
                  handleClick(
                    data.id,
                    OrganizationType[data.costCenter],
                    EditSections.ADMINISTRATIVE,
                  )
                }
              />
            )
          }
        />
        <Group>
          <GridWrapper>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord withDivider={false} value={data?.socialReason} label='Razão Social' />
            </GridItem>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord
                withDivider={false}
                value={data?.cnpj && cnpjNormalizer(data?.cnpj)}
                label='CNPJ'
              />
            </GridItem>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord withDivider={false} value={data?.nickname || '-'} label='Apelido' />
            </GridItem>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord withDivider={false} value={data?.fantasyName} label='Nome fantasia' />
            </GridItem>
          </GridWrapper>
        </Group>
      </Container>
      <StyledDivider />

      <Container mt={2}>
        <Title
          mt={2}
          content='Contatos'
          icon={
            canUpdateInstitution && (
              <EditButton
                onClick={() =>
                  handleClick(data.id, OrganizationType[data.costCenter], EditSections.CONTACTS)
                }
              />
            )
          }
        />

        <Group>
          <GridWrapper>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord
                value={data?.telephone && phoneNormalizer(data?.telephone)}
                label='Telefone'
                withDivider={false}
              />
            </GridItem>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord
                value={data?.whatsapp && phoneNormalizer(data?.whatsapp)}
                label='Whatsapp'
                withDivider={false}
              />
            </GridItem>
            <GridItem xs={6} sm={4}>
              <CDisplayRecord withDivider={false} value={data?.email} label='E-mail' />
            </GridItem>
          </GridWrapper>
        </Group>
      </Container>

      <StyledDivider />
      <Container mt={2}>
        <Title
          mt={2}
          content='Endereço'
          icon={
            canUpdateInstitution && (
              <EditButton
                onClick={() =>
                  handleClick(data.id, OrganizationType[data.costCenter], EditSections.ADDRESS)
                }
              />
            )
          }
        />

        <Group>
          <GridWrapper>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord
                value={
                  data?.address?.zipCode
                    ? cepNormalizer(String(data?.address?.zipCode))
                    : 'Não cadastrado'
                }
                label='CEP'
                withDivider={false}
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
              <CDisplayRecord
                withDivider={false}
                value={data?.address?.block || '-'}
                label='Bloco'
              />
            </GridItem>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord
                withDivider={false}
                value={data?.address?.complement || '-'}
                label='Complemento'
              />
            </GridItem>
          </GridWrapper>
        </Group>
      </Container>
      <StyledDivider />
      <Container my={2}>
        <Title
          mt={2}
          content='Dados financeiros'
          icon={
            canUpdateInstitution && (
              <EditButton
                onClick={() =>
                  handleClick(data.id, OrganizationType[data.costCenter], EditSections.FINANCIAL)
                }
              />
            )
          }
        />

        <Group>
          <GridWrapper>
            <GridItem xs={8} sm={3}>
              <CDisplayRecord
                value={data?.dueDate ? DueDateDescription[data.dueDate] : '-'}
                label='Data do vencimento'
                withDivider={false}
              />
            </GridItem>
            <GridItem xs={7} sm={3}>
              <CDisplayRecord
                value={data?.responsableFinance ? capitalizeName(data?.responsableFinance) : '-'}
                label='Responsável pelo financeiro/NFEs'
                withDivider={false}
              />
            </GridItem>
          </GridWrapper>
        </Group>

        <Group>
          <GridWrapper>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord withDivider={false} value={data?.bankAccount?.bank} label='Banco' />
            </GridItem>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord
                withDivider={false}
                value={data?.bankAccount?.agency}
                label='Agência'
              />
            </GridItem>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord
                withDivider={false}
                value={data?.bankAccount?.account}
                label='Conta'
              />
            </GridItem>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord withDivider={false} value={data?.bankAccount?.pixKey} label='Pix' />
            </GridItem>
          </GridWrapper>
        </Group>
      </Container>
    </>
  )
}

export default InstitutionDataTab

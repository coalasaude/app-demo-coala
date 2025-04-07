import { useRouter } from 'next/router'
import { Box } from '@mui/material'

import { CDisplayRecord, CDivider } from '@/v3/presentation/newComponents'
import { GridItem, GridWrapper } from '@/components/Grid'
import { useHasPermission } from '@/hooks/useHasPermission'
import { Permissions } from '@/constants/permissions'
import { InstitutionConfigEnum } from '@/constants/institutionConfig'
import { Container } from '@/v3/presentation/pages/health-unit/pages/view/styles'
import { Group, Title } from '@/v3/presentation/pages/health-unit/pages/view/components/Section'
import { EditSections } from '@/v3/presentation/pages/health-unit/components/Form/Steps'
import { useFetchPlan } from '@/v3/presentation/hooks/api/useFetchPlan'
import { CoverageExtensionType } from '@/v3/presentation/pages/organizations/pages/view/components/InstitutionTabPages/InstitutionData'
import { Institution } from '@/v3/domain/organizations/Organization'
import {
  ORGANIZATION_TYPE_DESCRIPTION,
  OrganizationType,
} from '@/v3/presentation/pages/organizations/constants/organizationType'
import { EditButton } from '@/v3/presentation/components/EditButton/EditButton'
import { formatURL } from '@/v3/utils/formatURL'
import { NEW_ROUTES } from '@/constants/routes'
import { SettingsSections } from '@/v3/presentation/pages/organizations/constants/settingsSections'
import { priceNormalizer } from '@/components/Forms/normalizers/priceNormalizer'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

export const coverageExtensionDescription: { [key in CoverageExtensionType]: string } = {
  [CoverageExtensionType.COVERAGE]: 'Cobertura de acidentes',
  [CoverageExtensionType.EMERGENCY_CALLCENTER]: 'Telemedicina de urgência',
}

export const InstitutionSettingsComponent = ({
  defaultSettings,
}: {
  defaultSettings: Institution
}) => {
  const router = useRouter()
  const { auth } = useAuth()
  const [canManageOrganization] = useHasPermission([Permissions.MANAGE_ORGANIZATION])

  const canEditPublicInstitutions = canManageOrganization && auth?.user?.isAdmin

  const openingHour = defaultSettings?.getConfig(InstitutionConfigEnum.OPENING_HOURS)?.value

  const emergencyCallcenter = defaultSettings?.getConfig(InstitutionConfigEnum.EMERGENCY_CALLCENTER)

  const coverage = defaultSettings?.getConfig(InstitutionConfigEnum.COVERAGE)

  const notification = defaultSettings?.getConfig(InstitutionConfigEnum.NOTIFICATION)?.value

  const firstAccessNotification = defaultSettings?.getConfig(
    InstitutionConfigEnum.NOTIFICATION_TO_FIRST_ACCESS,
  )?.value

  const statusNotification = defaultSettings?.getConfig(
    InstitutionConfigEnum.STATUS_NOTIFICATION,
  )?.value

  const helpNotification = defaultSettings?.getConfig(
    InstitutionConfigEnum.HELP_NOTIFICATION,
  )?.value

  const mentalHealth = defaultSettings?.getConfig(InstitutionConfigEnum.MENTAL_HEALTH_PRODUCT)

  const canPayCoverage = defaultSettings?.getConfig(InstitutionConfigEnum.CAN_PAY_COVERAGE)

  const centerCost = defaultSettings?.getConfig<OrganizationType>(
    InstitutionConfigEnum.CENTER_COST,
  )?.value

  const sendEmailInvoice = defaultSettings?.getConfig(
    InstitutionConfigEnum.SEND_EMAIL_INVOICE,
  )?.value

  const infringementPayment = defaultSettings?.getConfig(InstitutionConfigEnum.INFRINGEMENT)?.value

  const latePayment = defaultSettings?.getConfig(InstitutionConfigEnum.LATE_PAYMENT)?.value

  const coverageExtension = defaultSettings?.getConfig<CoverageExtensionType[]>(
    InstitutionConfigEnum.COVERAGE_EXTENSION,
  )

  const canUseCoverageExtension = defaultSettings?.getConfig(
    InstitutionConfigEnum.CAN_USE_COVERAGE_EXTENSION,
  )?.value

  const nutritionCoverage = defaultSettings?.getConfig(InstitutionConfigEnum.NUTRITION_COVERAGE)

  const coverageValue = defaultSettings?.getConfig(InstitutionConfigEnum.COVERAGE_VALUE)

  const { data: coveragePlan } = useFetchPlan(Number(canPayCoverage?.value))

  const emergencyCallcenterProfiles = emergencyCallcenter?.profiles?.map((profile) => profile?.name)

  const coverageProfiles = coverage?.profiles?.map((profile) => profile?.name)

  const mentalHealthProfiles = mentalHealth?.profiles?.map((profile) => profile?.name)

  const canPayCoverageProfiles = canPayCoverage?.profiles?.map((profile) => profile?.name)

  const canUseCoverageProducts = coverageExtension?.value?.map(
    (product) => coverageExtensionDescription[product],
  )

  const canUseCoverageProfiles = coverageExtension?.profiles?.map((profile) => profile?.name)

  const canUseNutritionCoverageProfiles = nutritionCoverage?.profiles?.map(
    (profile) => profile?.name,
  )

  const joinEmergyCallcenterProfiles = emergencyCallcenterProfiles?.join(', ')
  const joinCoverageProfiles = coverageProfiles?.join(', ')
  const joinMentalHealthProfiles = mentalHealthProfiles?.join(', ')
  const joinCanPayCoverageProfiles = canPayCoverageProfiles?.join(', ')
  const joinCanUseCoverageProducts = canUseCoverageProducts?.join(', ')
  const joinCanUseCoverageProfiles = canUseCoverageProfiles?.join(', ')
  const joinNutritionCoverageProfiles = canUseNutritionCoverageProfiles?.join(', ')

  const handleClick = (
    id: number,
    orgType: string,
    section: EditSections,
    settingsSection: SettingsSections,
  ) => {
    const url = formatURL(NEW_ROUTES.AUTHENTICATED.ORGANIZATION.EDIT.path, {
      pathParams: {
        id: String(id),
        type: orgType,
      },
      queryParams: {
        section,
        settingsSection,
      },
    })

    router.push(url)
  }

  return (
    <>
      <Box p={2}>
        <Title
          content='Cobertura padrão'
          icon={
            canEditPublicInstitutions && (
              <EditButton
                onClick={() =>
                  handleClick(
                    defaultSettings.id,
                    OrganizationType[defaultSettings.costCenter],
                    EditSections.SETTINGS,
                    SettingsSections.STANDARD,
                  )
                }
              />
            )
          }
        />

        <Group>
          <GridWrapper>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord
                withDivider={false}
                value={openingHour?.length && `${openingHour?.[0]} às ${openingHour?.[1]}`}
                label='Horário de atendimento por instituição'
              />
            </GridItem>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord
                withDivider={false}
                value={joinEmergyCallcenterProfiles ? joinEmergyCallcenterProfiles : '-'}
                label='Telemedicina de urgência'
              />
            </GridItem>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord
                withDivider={false}
                value={emergencyCallcenter ? emergencyCallcenter.value : '-'}
                label='Quantidade de cortesias'
              />
            </GridItem>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord
                withDivider={false}
                value={joinCoverageProfiles ? joinCoverageProfiles : '-'}
                label='Cobertura de acidentes'
              />
            </GridItem>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord
                withDivider={false}
                value={coverage?.value ? priceNormalizer(coverage.value) : '-'}
                label='Valor da cobertura de acidentes'
              />
            </GridItem>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord
                withDivider={false}
                value={joinMentalHealthProfiles ? joinMentalHealthProfiles : '-'}
                label='Saúde mental'
              />
            </GridItem>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord
                withDivider={false}
                value={joinNutritionCoverageProfiles ? joinNutritionCoverageProfiles : '-'}
                label='Nutrição'
              />
            </GridItem>
          </GridWrapper>
        </Group>
      </Box>

      <CDivider />

      <Container>
        <Title
          content='Coala em casa'
          icon={
            canEditPublicInstitutions && (
              <EditButton
                onClick={() =>
                  handleClick(
                    defaultSettings.id,
                    OrganizationType[defaultSettings.costCenter],
                    EditSections.SETTINGS,
                    SettingsSections.COALA_AT_HOME,
                  )
                }
              />
            )
          }
        />

        <Group>
          <GridWrapper>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord
                withDivider={false}
                value={coveragePlan || joinCanPayCoverageProfiles ? 'Ativo' : 'Inativo'}
                label='Coala em casa'
              />
            </GridItem>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord
                withDivider={false}
                value={joinCanPayCoverageProfiles}
                label='Contratação habilitada para'
              />
            </GridItem>
            <GridItem xs={6} sm={4}>
              <CDisplayRecord
                withDivider={false}
                value={coveragePlan ? coveragePlan.product_name : '-'}
                label='Plano habilitado'
              />
            </GridItem>
          </GridWrapper>
        </Group>
      </Container>

      <CDivider />
      <Container>
        <Title
          content='Cobertura estendida'
          icon={
            canEditPublicInstitutions && (
              <EditButton
                onClick={() =>
                  handleClick(
                    defaultSettings.id,
                    OrganizationType[defaultSettings.costCenter],
                    EditSections.SETTINGS,
                    SettingsSections.EXTENDED,
                  )
                }
              />
            )
          }
        />

        <Group>
          <GridWrapper>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord
                withDivider={false}
                value={
                  coverageExtension?.value.length ||
                  coverageExtension?.profiles ||
                  canUseCoverageExtension
                    ? 'Ativo'
                    : 'Inativo'
                }
                label='Permite cobertura estendida?'
              />
            </GridItem>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord
                value={joinCanUseCoverageProducts}
                label='Produtos habilitados'
                withDivider={false}
              />
            </GridItem>

            <GridItem xs={6} sm={3}>
              <CDisplayRecord
                withDivider={false}
                value={joinCanUseCoverageProfiles}
                label='Quais perfis poderão contratar?'
              />
            </GridItem>
            <GridItem xs={6} sm={3}>
              <CDisplayRecord
                withDivider={false}
                value={canUseCoverageExtension ? 'Ativo' : 'Inativo'}
                label='Atribuir cobertura manualmente?'
              />
            </GridItem>
          </GridWrapper>
        </Group>
      </Container>
      <CDivider />
      <Container>
        <Title
          content='Comunicação'
          icon={
            canEditPublicInstitutions && (
              <EditButton
                onClick={() =>
                  handleClick(
                    defaultSettings.id,
                    OrganizationType[defaultSettings.costCenter],
                    EditSections.SETTINGS,
                    SettingsSections.COMMUNICATION,
                  )
                }
              />
            )
          }
        />

        <Group>
          <GridWrapper>
            <GridItem xs={8} sm={4}>
              <CDisplayRecord
                withDivider={false}
                value={helpNotification ? 'Ativo' : 'Inativo'}
                label='Notificar responsáveis da abertura de atendimentos'
              />
            </GridItem>
            <GridItem xs={7} sm={4}>
              <CDisplayRecord
                withDivider={false}
                value={statusNotification ? 'Ativo' : 'Inativo'}
                label='Notificar responsáveis da alteração de status dos atendimentos'
              />
            </GridItem>
            <GridItem xs={7} sm={4}>
              <CDisplayRecord
                withDivider={false}
                value={notification ? 'Ativo' : 'Inativo'}
                label='Desabilitar demais notificações da plataforma'
              />
            </GridItem>
            <GridItem xs={7} sm={4}>
              <CDisplayRecord
                withDivider={false}
                value={firstAccessNotification ? 'Ativo' : 'Inativo'}
                label='Habilitar notificações para usuários com primeiro acesso pendente'
              />
            </GridItem>
          </GridWrapper>
        </Group>
      </Container>
      <CDivider />
      <Container>
        <Title
          content='Financeiro'
          icon={
            canEditPublicInstitutions && (
              <EditButton
                onClick={() =>
                  handleClick(
                    defaultSettings.id,
                    OrganizationType[defaultSettings.costCenter],
                    EditSections.SETTINGS,
                    SettingsSections.FINANCIAL,
                  )
                }
              />
            )
          }
        />

        <Group>
          <GridWrapper>
            <GridItem xs={8} sm={3}>
              <CDisplayRecord
                withDivider={false}
                value={coverageValue?.value[0]}
                label='Valor negociado por gestor coberto'
              />
            </GridItem>
            <GridItem xs={7} sm={3}>
              <CDisplayRecord
                withDivider={false}
                value={coverageValue?.value[1]}
                label='Valor negociado por colaborador coberto'
              />
            </GridItem>
            <GridItem xs={7} sm={3}>
              <CDisplayRecord
                withDivider={false}
                value={coverageValue?.value[2]}
                label='Valor negociado por aluno coberto'
              />
            </GridItem>
            <GridItem xs={7} sm={3}>
              <CDisplayRecord
                withDivider={false}
                value={ORGANIZATION_TYPE_DESCRIPTION[centerCost as OrganizationType]}
                label='Centro de custo'
              />
            </GridItem>
            <GridItem xs={7} sm={3}>
              <CDisplayRecord
                withDivider={false}
                value={sendEmailInvoice ? sendEmailInvoice : '-'}
                label='E-mails para envio de cobranças'
              />
            </GridItem>
            <GridItem xs={7} sm={3}>
              <CDisplayRecord
                withDivider={false}
                value={infringementPayment ? 'Sim' : 'Não'}
                label='Instituição está inadimplente?'
              />
            </GridItem>
            <GridItem xs={7} sm={3}>
              <CDisplayRecord
                withDivider={false}
                value={latePayment ? 'Sim' : 'Não'}
                label='Instituição está com pagamento atrasado?'
              />
            </GridItem>
          </GridWrapper>
        </Group>
      </Container>
    </>
  )
}

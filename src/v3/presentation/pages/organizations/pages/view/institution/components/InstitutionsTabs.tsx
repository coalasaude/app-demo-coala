import React from 'react'

import CTabs from '@/v3/presentation/components/TabsContainer'
import { InstitutionSettingsComponent } from '@/v3/presentation/pages/organizations/pages/view/components/InstitutionTabPages/institutionConfig'
import { CostCenter, Institution } from '@/v3/domain/organizations/Organization'
import useMediaQuery from '@/hooks/useMediaQuery'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import Paper from '@/v3/presentation/components/Paper'

import UnitPanel from '../../components/UnitPanel'
import InstitutionDataTab from '../../components/InstitutionTabPages/InstitutionData'
import InstitutionUsers from '../../components/InstitutionTabPages/InstitutionUsers'
import LinkTab from '../../components/InstitutionTabPages/Link'
import HealthUnitsTab from '../../components/InstitutionTabPages/HealthUnits'
import { ReportsTab } from '../../components/InstitutionTabPages/Reports/ReportsTab'
import { ImportTab } from '../../components/InstitutionTabPages/Import'
import LearningTab from '../../components/InstitutionTabPages/Learning'

import { institutionTabEnum } from './constant/institutionTabEnum'

type InstitutionTabsProps = {
  data: Institution
  canEditOwnOrganization: boolean
  canExportUsers: boolean
  canImportByCsv: boolean
  canUpdateInstitution: boolean
  canView: boolean
}

export const InstitutionTabs = ({
  canEditOwnOrganization,
  canExportUsers,
  canImportByCsv,
  canUpdateInstitution,
  canView,
  data,
}: InstitutionTabsProps) => {
  const isSmallMobile = useMediaQuery('xs')
  const { auth } = useAuth()

  if (data) {
    let tabNames = [
      'Painel de dados',
      'Aprendizado',
      'Dados cadastrais',
      'Usuários',
      'Vínculos',
      'Unidades de saúde',
      'Configurações',
      'Relatórios',
      'Importações',
    ]

    let tabBody = [
      <UnitPanel key={institutionTabEnum.UNIT_PANEL} type='institution' />,
      <LearningTab key={institutionTabEnum.LEARNING_TAB} institutionId={data.id} />,
      <InstitutionDataTab
        type='institution'
        canUpdateInstitution={canUpdateInstitution || canEditOwnOrganization}
        data={data}
        key={institutionTabEnum.DATA_TAB}
      />,
      <InstitutionUsers
        currentOrg={data.id}
        canImportByCsv={canImportByCsv}
        canExportUsers={canExportUsers}
        orgType={CostCenter.INSTITUTION}
        key={institutionTabEnum.USERS_TAB}
      />,
      <LinkTab
        type='institution'
        canView={canView}
        canEdit={canUpdateInstitution || canEditOwnOrganization}
        data={data}
        key={institutionTabEnum.LINK_TAB}
      />,
      <HealthUnitsTab key={institutionTabEnum.HEALTH_UNITS_TAB} />,
      <InstitutionSettingsComponent defaultSettings={data} key={institutionTabEnum.SETTINGS_TAB} />,
      <ReportsTab type='institution' data={data} key={institutionTabEnum.REPORTS_TAB} />,
      <ImportTab key={institutionTabEnum.IMPORT_TAB} />,
    ]

    if (!auth?.user?.isAdmin) {
      tabNames = tabNames.filter((tab) => tab !== 'Configurações')
      tabBody = tabBody.filter((tab) => Number(tab.key) !== 5)
    }

    if (!canImportByCsv) {
      tabNames = tabNames.filter((tab) => tab !== 'Importações')
      tabBody = tabBody.filter((tab) => Number(tab.key) !== 6)
    }

    return (
      <Paper p={0} overflow='hidden' noBorder>
        <CTabs
          style={{ paddingTop: !isSmallMobile ? 6 : 3 }}
          tabsNames={tabNames}
          tabsBody={tabBody}
          defaultIndex={institutionTabEnum.UNIT_PANEL}
        />
      </Paper>
    )
  }
}

export default InstitutionTabs

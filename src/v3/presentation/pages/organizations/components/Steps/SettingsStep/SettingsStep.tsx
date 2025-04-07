import { useFetchPlans } from '@/v3/presentation/hooks/api/plan/useFetchPlans'
import { InstitutionConfig } from '@/constants/institutionConfig'
import { useFetchUserProfiles } from '@/v3/presentation/hooks/useFetchUserProfiles'

import { SettingsSections } from '../../../constants/settingsSections'

import { FinancialSettings } from './Financial'
import { CommunicationSettings } from './Communication'
import { ExtendedCoverageSettings } from './ExtendedCoverage'
import { CoalaAtHomeSettings } from './CoalaAtHome'
import { StandardCoverageSettings } from './StandardCoverage'

type SettingsStepProps = {
  sections?: SettingsSections[]
}

export const SettingsStep = ({ sections }: SettingsStepProps) => {
  const { data: plansData } = useFetchPlans()
  const { data: profilesData } = useFetchUserProfiles({ institutionTypeId: 1 })

  const plansOptions = plansData?.results?.map(({ id, product_name }) => ({
    label: product_name,
    value: id,
  }))

  const profilesOptions = profilesData?.map(({ id, name }) => ({
    label: name,
    value: id,
  }))

  const productsOptions = [
    { label: 'Telemedicina de urgência', value: InstitutionConfig.EMERGENCY_CALLCENTER },
    { label: 'Cobertura de acidentes', value: InstitutionConfig.COVERAGE },
  ]

  if (!sections) {
    sections = Object.values(SettingsSections)
  }

  return (
    <>
      {sections.includes(SettingsSections.STANDARD) && (
        <StandardCoverageSettings profilesOptions={profilesOptions} />
      )}

      {sections.includes(SettingsSections.COALA_AT_HOME) && (
        <CoalaAtHomeSettings plansOptions={plansOptions} profilesOptions={profilesOptions} />
      )}

      {sections.includes(SettingsSections.EXTENDED) && (
        <ExtendedCoverageSettings
          productsOptions={productsOptions}
          profilesOptions={profilesOptions}
        />
      )}

      {sections.includes(SettingsSections.COMMUNICATION) && <CommunicationSettings />}

      {sections.includes(SettingsSections.FINANCIAL) && (
        <FinancialSettings profilesOptions={profilesOptions} />
      )}
    </>
  )
}

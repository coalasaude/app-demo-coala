import { CostCenter } from '@/v3/domain/organizations/Organization'
import { CardInstitution } from '@/v3/presentation/components/CardUnit'
import { useFetchNetwork } from '@/v3/presentation/hooks/api/organizations'
import { useFetchInstitution } from '@/v3/presentation/hooks/api/organizations/institution/useFetchInsitution'
import { useFetchBrand } from '@/v3/presentation/hooks/api/organizations/brand/useFetchBrand'
import { CDisplayRecordProps } from '@/v3/presentation/newComponents'

import { ORGANIZATION_TYPE_DESCRIPTION } from '../../../organizations/constants/organizationType'

export const InstitutionalHeader = ({
  institutionId,
  orgType,
}: {
  institutionId?: number
  orgType?: CostCenter
}) => {
  const mapperUseFetchOrganization = {
    [CostCenter.BRAND]: useFetchBrand,
    [CostCenter.NETWORK]: useFetchNetwork,
    [CostCenter.INSTITUTION]: useFetchInstitution,
  }
  const fetch = orgType ? mapperUseFetchOrganization[orgType] : useFetchInstitution
  const { data: organization } = fetch(institutionId, {
    selectUserProfileCount: true,
  })

  if (!institutionId) return null

  const countUserProfiles = organization?.getCountUserProfiles()
  const name = organization?.fantasyName

  const bodyItems: CDisplayRecordProps[] = [
    {
      label: 'Gestores',
      value: countUserProfiles?.managementCount,
    },
    {
      label: 'Alunos',
      value: countUserProfiles?.studentCount,
    },
    {
      label: 'Colaboradores',
      value: countUserProfiles?.colaboratorCount,
    },
    {
      label: 'Responsáveis',
      value: countUserProfiles?.responsibleCount,
    },
  ]

  if (countUserProfiles?.healthTeamCount) {
    bodyItems.push({
      label: 'Time de saúde',
      value: countUserProfiles?.healthTeamCount,
    })
  }

  return (
    <CardInstitution
      title={name || ''}
      subtitle={orgType ? ORGANIZATION_TYPE_DESCRIPTION[orgType] : 'Instituição'}
      status={organization?.status || 'ACTIVE'}
      hasAvatar
      bodyItems={bodyItems}
    />
  )
}

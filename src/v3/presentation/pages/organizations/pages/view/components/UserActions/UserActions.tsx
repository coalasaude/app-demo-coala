import { useFetchInstitution } from '@/v3/presentation/hooks/api/organizations/institution/useFetchInsitution'
import { GridItem, GridWrapper } from '@/components/Grid'
import { CostCenter } from '@/v3/domain/organizations/Organization'
import { useFetchBrand } from '@/v3/presentation/hooks/api/organizations/brand/useFetchBrand'
import { useFetchNetwork } from '@/v3/presentation/hooks/api/organizations'
import { CDisplayRecordProps } from '@/v3/presentation/newComponents'

import { StyledContainer } from '../InstitutionActions/styles'
import InstitutionActionsCard from '../InstitutionActions/InstitutionActionsCard'
import { CardTitle } from '../InstitutionActions/config'

export const UserActions = ({
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

  const { data: organization } = fetch(institutionId, { selectUserProfileCount: true })

  if (!institutionId) return null

  const countUserProfiles = organization?.getCountUserProfiles()

  const bodyItems: CDisplayRecordProps[] = [
    {
      label: <CardTitle>Gestores</CardTitle>,
      value: countUserProfiles?.managementCount,
    },
    {
      label: <CardTitle>Alunos</CardTitle>,
      value: countUserProfiles?.studentCount,
    },
    {
      label: <CardTitle>Colaboradores</CardTitle>,
      value: countUserProfiles?.colaboratorCount,
    },
    {
      label: <CardTitle>Responsáveis</CardTitle>,
      value: countUserProfiles?.responsibleCount,
    },
  ]

  if (countUserProfiles?.healthTeamCount) {
    bodyItems.push({
      label: <CardTitle>Time de saúde</CardTitle>,
      value: countUserProfiles?.healthTeamCount,
    })
  }

  return (
    <StyledContainer>
      <GridWrapper>
        {bodyItems.map(({ label, value }, i) => {
          return (
            <GridItem xs={6} sm={3} key={i}>
              <InstitutionActionsCard value={value} title={label} />
            </GridItem>
          )
        })}
      </GridWrapper>
    </StyledContainer>
  )
}

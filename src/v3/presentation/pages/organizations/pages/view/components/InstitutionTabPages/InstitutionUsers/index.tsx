import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import { CostCenter } from '@/v3/domain/organizations/Organization'
import { IUserFilterFields } from '@/v3/presentation/pages/users/components/UserListTable/type'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { CButtonGroup } from '@/v3/presentation/newComponents/molecules/CButtonGroup'
import { CButton } from '@/v3/presentation/newComponents'

import { UserActions } from '../../UserActions'

import ActivatePage from './components/ActivatePage'
import InactivePage from './components/InactivePage'

enum Tabs {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export const InstitutionUsers = ({
  currentOrg,
  orgType,
  canExportUsers,
  canImportByCsv,
}: {
  currentOrg?: number
  canExportUsers: boolean
  orgType: CostCenter
  canImportByCsv: boolean
}) => {
  const router = useRouter()
  const queryParams = router.query as IUserFilterFields

  const { queryParam, setQueryParam } = useUrlQueryControl({
    queryName: 'usersTab',
    defaultValue: Tabs.ACTIVE,
  })

  const selectedIndex = queryParam === Tabs.ACTIVE ? 0 : 1

  const handleTabChange = (tab: Tabs) => {
    setQueryParam(tab)
  }

  return (
    <>
      <Box pt={2} mx={2} mb={4}>
        <Typography variant='h4' mb={2}>
          Usuários
        </Typography>
        <UserActions institutionId={currentOrg} orgType={orgType} />
      </Box>
      <Box pl={2}>
        <CButtonGroup
          orientation='horizontal'
          size='small'
          variant='secondary'
          selectedIndex={selectedIndex}
        >
          <CButton key={1} onClick={() => handleTabChange(Tabs.ACTIVE)}>
            Vinculados
          </CButton>
          <CButton key={2} onClick={() => handleTabChange(Tabs.INACTIVE)}>
            Desvinculados
          </CButton>
        </CButtonGroup>
      </Box>
      {queryParam === Tabs.ACTIVE && (
        <ActivatePage
          currentOrg={currentOrg}
          canExportUsers={canExportUsers}
          canImportByCsv={canImportByCsv}
          orgType={orgType}
          queryParams={queryParams}
        />
      )}
      {queryParam === Tabs.INACTIVE && (
        <InactivePage currentOrg={currentOrg} orgType={orgType} queryParams={queryParams} />
      )}
    </>
  )
}

export default InstitutionUsers

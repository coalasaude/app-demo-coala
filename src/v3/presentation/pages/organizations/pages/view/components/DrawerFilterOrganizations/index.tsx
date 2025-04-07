import { Box } from '@mui/material'
import { useState } from 'react'

import { CFilterDrawer } from '@/v3/presentation/newComponents/layout/CFilterDrawer'
import {
  CostCenter,
  InstitutionViolationType,
  InstitutionStatus,
} from '@/v3/domain/organizations/Organization'
import { ListOrganizationsFilters } from '@/v3/presentation/hooks/api/organizations/useFetchListOrganizations'
import CSelect from '@/v3/presentation/newComponents/atoms/CSelect'

interface DrawerFilterOrganizationsProps {
  isOpenFilter: boolean
  filters: ListOrganizationsFilters
  setIsOpenFilter: (isOpen: boolean) => void
  onSetFilters: (filters: ListOrganizationsFilters) => void
}

export const DrawerFilterOrganizations = ({
  isOpenFilter,
  setIsOpenFilter,
  filters,
  onSetFilters,
}: DrawerFilterOrganizationsProps) => {
  const [institutionStatusFilter, setInstitutionStatusFilter] = useState<InstitutionStatus>(
    filters.status || InstitutionStatus.ACTIVE,
  )
  const [orgType, setOrgType] = useState<CostCenter>(filters.type || CostCenter.INSTITUTION)
  const [orgInfringement, setOrgInfringement] = useState<InstitutionViolationType>(
    filters.violation || InstitutionViolationType.ALL,
  )
  const statusOptions = [
    {
      label: 'Ativo',
      value: InstitutionStatus.ACTIVE,
    },
    {
      label: 'Inativo',
      value: InstitutionStatus.INACTIVE,
    },
  ]

  if (orgType === CostCenter.INSTITUTION) {
    statusOptions.push({
      label: 'Trial',
      value: InstitutionStatus.TRIAL,
    })
  }

  const handleClose = () => {
    onSetFilters({
      type: orgType,
      status: institutionStatusFilter,
      violation: orgInfringement,
    })
    setIsOpenFilter(false)
  }

  const onClearFilter = () => {
    setOrgType(CostCenter.INSTITUTION)
    setInstitutionStatusFilter(InstitutionStatus.ACTIVE)
    setOrgInfringement(InstitutionViolationType.ALL)
  }

  return (
    <CFilterDrawer
      open={isOpenFilter}
      onClose={handleClose}
      onApply={handleClose}
      onClear={() => onClearFilter()}
    >
      <Box display='flex' flexDirection='column' gap={2}>
        <CSelect
          label='Tipo da organização'
          name='org_type_filter'
          fullWidth={true}
          options={[
            {
              label: 'Instituições',
              value: CostCenter.INSTITUTION,
            },
            {
              label: 'Marcas',
              value: CostCenter.BRAND,
            },
            {
              label: 'Redes',
              value: CostCenter.NETWORK,
            },
          ]}
          onChange={(e) => setOrgType(e.target.value as CostCenter)}
          disabledNullOption
          value={orgType}
          defaultValue={orgType}
        />
        <CSelect
          label='Organização inadimplente'
          name='org_violation_filter'
          fullWidth={true}
          options={[
            {
              label: 'Todas',
              value: InstitutionViolationType.ALL,
            },
            {
              label: 'Inadimplentes',
              value: InstitutionViolationType.INFRINGEMENT,
            },
            {
              label: 'Pagamento atrasado',
              value: InstitutionViolationType.LATE_PAYMENT,
            },
          ]}
          onChange={(e) => setOrgInfringement(e.target.value as InstitutionViolationType)}
          disabledNullOption
          value={orgInfringement}
          defaultValue={orgInfringement}
        />
        {orgType !== CostCenter.NETWORK && (
          <CSelect
            label='Status da organização'
            name='org_status_filter'
            fullWidth={true}
            options={statusOptions}
            onChange={(e) => setInstitutionStatusFilter(e.target.value as InstitutionStatus)}
            disabledNullOption
            value={institutionStatusFilter}
            defaultValue={institutionStatusFilter}
          />
        )}
      </Box>
    </CFilterDrawer>
  )
}

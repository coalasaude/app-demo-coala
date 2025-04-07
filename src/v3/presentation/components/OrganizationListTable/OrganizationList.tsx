import { Table, TableBody, TableCell, TableContainer, TableHead } from '@mui/material'

import { CostCenter, Organization } from '@/v3/domain/organizations/Organization'
import { CTableRow } from '@/v3/presentation/newComponents/atoms/CTableRow/CTableRow'

import OrganizationRow from './OrganizationRow/OrganizationRow'

interface OrganizationListTableProps {
  organizations: Organization[]

  onClickRow?: (id: number, type: CostCenter) => void
}

const OrganizationListTable = ({
  organizations,

  onClickRow,
}: OrganizationListTableProps) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <CTableRow>
            <TableCell sx={{ maxWidth: 260 }}>Instituição</TableCell>
            <TableCell>CNPJ</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>Status</TableCell>
          </CTableRow>
        </TableHead>
        <TableBody>
          {organizations?.map((organization, index) => (
            <OrganizationRow
              onClickRow={() => onClickRow?.(organization.id, organization.costCenter)}
              key={organization.id}
              organization={organization}
              isLastItem={index === organizations.length - 1}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OrganizationListTable

import { Table, TableBody, TableCell, TableContainer, TableHead } from '@mui/material'

import { CTableRow } from '@/v3/presentation/newComponents/atoms/CTableRow/CTableRow'
import { SummarySummaryHealthUnitModel } from '@/v3/domain/@v2/health-units/health-unit/summary-health-unit.model'

import HealthUnitListRow from './HealthUnitListRow/HealthUnitListRow'

interface OrganizationListTableProps {
  healthUnits: SummarySummaryHealthUnitModel[]
  canEdit?: boolean
  handleEdit?: (id: number) => void
  onClickRow?: (id: number) => void
}

const HealthUnitListTable = ({
  healthUnits,
  canEdit,
  handleEdit,
  onClickRow,
}: OrganizationListTableProps) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <CTableRow>
            <TableCell sx={{ maxWidth: 260 }}>Unidade de saúde</TableCell>
            <TableCell>CNPJ</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>Status</TableCell>
            {canEdit && <TableCell>Ações</TableCell>}
          </CTableRow>
        </TableHead>
        <TableBody>
          {healthUnits?.map((healthUnit, index) => (
            <HealthUnitListRow
              onClickRow={() => onClickRow?.(healthUnit.id)}
              key={healthUnit.id}
              healthUnit={healthUnit}
              canEdit={canEdit}
              handleEdit={() => handleEdit?.(healthUnit.id)}
              isLastItem={index === healthUnits.length - 1}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default HealthUnitListTable

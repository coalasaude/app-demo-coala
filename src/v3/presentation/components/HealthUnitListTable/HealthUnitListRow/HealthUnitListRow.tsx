import { Box, Typography } from '@mui/material'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'

import CTableRow from '@/v3/presentation/newComponents/atoms/CTableRow'
import { AppointmentStatusChip } from '@/v3/presentation/pages/appointment/Emergency/components/AppointmentStatusChip'
import { cnpjNormalizer } from '@/components/Forms/normalizers/cnpjNormalizer'
import { DefaultStatus } from '@/types/status'
import { SummarySummaryHealthUnitModel } from '@/v3/domain/@v2/health-units/health-unit/summary-health-unit.model'
import { HEALTH_UNIT_TYPE_DESCRIPTION } from '@/v3/presentation/pages/health-unit/constants'

import { CAvatarWithModal } from '../../CAvatar'

interface HealthUnitListRowProps {
  healthUnit: SummarySummaryHealthUnitModel
  onClickRow: () => void
  handleEdit?: () => void
  canEdit?: boolean
  isLastItem?: boolean
}

const HealthUnitListRow = ({
  healthUnit,
  onClickRow,
  canEdit,
  handleEdit,
  isLastItem,
}: HealthUnitListRowProps) => {
  const sx = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }

  return (
    <CTableRow
      key={healthUnit.id}
      onClick={onClickRow}
      sx={{
        position: 'relative',
        [`& .${tableCellClasses.root}`]: {
          borderBottom: isLastItem && 'none',
        },
      }}
    >
      <TableCell sx={{ ...sx, display: 'flex', alignItems: 'center', gap: 1 }}>
        <CAvatarWithModal variant='organization' src={''} width={40} height={40} />
        <Box>
          <Typography variant='h5'>{healthUnit.name || 'Não cadastrado'}</Typography>
          <Typography variant='body2' color='var(--mui-palette-grey-600)' mr={1}>
            {HEALTH_UNIT_TYPE_DESCRIPTION[healthUnit.type]}
          </Typography>
        </Box>
      </TableCell>
      <TableCell sx={sx}>
        <Typography>{cnpjNormalizer(healthUnit.company.cnpj) || 'Não cadastrado'}</Typography>
      </TableCell>
      <TableCell sx={sx}>
        <Typography>{healthUnit.contact.phone || 'Não cadastrado'}</Typography>
      </TableCell>
      <TableCell sx={sx}>
        <AppointmentStatusChip
          title={healthUnit.status === DefaultStatus.ACTIVE ? 'Ativo' : 'Inativo'}
          bgColor={
            healthUnit.status === DefaultStatus.ACTIVE
              ? '--mui-palette-success-light'
              : '--mui-palette-grey-100'
          }
          circleColor={
            healthUnit.status === DefaultStatus.ACTIVE
              ? '--mui-palette-success-main'
              : '--mui-palette-grey-400'
          }
        />
      </TableCell>
      {canEdit && handleEdit && (
        <TableCell onClick={handleEdit}>
          <ModeEditOutlineOutlinedIcon sx={{ fill: 'var(--mui-palette-grey-500)' }} />
        </TableCell>
      )}
    </CTableRow>
  )
}

export default HealthUnitListRow

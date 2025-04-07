import { Box, Typography } from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { useRouter } from 'next/router'

import CTableRow from '@/v3/presentation/newComponents/atoms/CTableRow'
import { AppointmentStatusChip } from '@/v3/presentation/pages/appointment/Emergency/components/AppointmentStatusChip'
import { ORGANIZATION_TYPE_DESCRIPTION } from '@/v3/presentation/pages/organizations/constants/organizationType'
import { CostCenter } from '@/v3/domain/organizations/Organization'
import { ListOrganizationsFilters } from '@/v3/presentation/hooks/api/organizations/useFetchListOrganizations'
import { cnpjNormalizer } from '@/components/Forms/normalizers/cnpjNormalizer'
import { formatPhoneNumber } from '@/utils/formatPhoneNumber'
import { DefaultStatus } from '@/types/status'
import { Organization } from '@/v3/domain/organizations/Organization'

import { CAvatarWithModal } from '../../CAvatar'

interface OrganizationRowProps {
  organization: Organization
  onClickRow: () => void
  isLastItem?: boolean
}

const OrganizationRow = ({ organization, onClickRow, isLastItem }: OrganizationRowProps) => {
  const router = useRouter()
  const queryParams = router.query as ListOrganizationsFilters

  const sx = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }

  return (
    <CTableRow
      key={organization.id}
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
          <Typography variant='h5'>{organization.fantasyName || 'Não cadastrado'}</Typography>
          <Typography variant='body2' color='var(--mui-palette-grey-600)' mr={1}>
            {ORGANIZATION_TYPE_DESCRIPTION[queryParams.type || CostCenter.INSTITUTION]}
          </Typography>
        </Box>
      </TableCell>
      <TableCell sx={sx}>
        <Typography>{cnpjNormalizer(organization.cnpj) || 'Não cadastrado'}</Typography>
      </TableCell>
      <TableCell sx={sx}>
        <Typography>{formatPhoneNumber(organization.telephone) || 'Não cadastrado'}</Typography>
      </TableCell>
      <TableCell sx={sx}>
        <AppointmentStatusChip
          title={organization.status === DefaultStatus.ACTIVE ? 'Ativo' : 'Inativo'}
          bgColor={
            organization.status === DefaultStatus.ACTIVE
              ? '--mui-palette-success-light'
              : '--mui-palette-grey-100'
          }
          circleColor={
            organization.status === DefaultStatus.ACTIVE
              ? '--mui-palette-success-main'
              : '--mui-palette-grey-400'
          }
        />
      </TableCell>
    </CTableRow>
  )
}

export default OrganizationRow

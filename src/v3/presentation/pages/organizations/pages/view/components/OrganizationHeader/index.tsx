import { Box, Typography } from '@mui/material'

import { CDivider } from '@/v3/presentation/newComponents'
import { DEFAULT_STATUS_DESCRIPTIONS } from '@/v3/presentation/pages/health-unit/constants/defaultStatus'
import { DefaultStatus } from '@/v3/domain/api/ApiCourseResponse'
import { formatPhoneNumber } from '@/utils/formatPhoneNumber'
import Paper from '@/v3/presentation/components/Paper'
import { cnpjNormalizer } from '@/components/Forms/normalizers/cnpjNormalizer'
import { CAvatarWithModal } from '@/v3/presentation/components/CAvatar'
import { Experimental_CInformation } from '@/v3/presentation/newComponents/molecules/Experimental_CInformation'

interface OrgInfoCardProps {
  status?: DefaultStatus
  fantasyName?: string
  type?: string
  cnpj?: string
  telephone?: string
  imageUrl?: string

  onImageChange?: (file?: File) => void
}

export const OrgInfoHeader = ({
  status,
  fantasyName,
  type,
  telephone,
  cnpj,
  imageUrl,
  onImageChange,
}: OrgInfoCardProps) => {
  return (
    <Paper sx={{ backgroundColor: '#FFFF' }}>
      <Box display='flex' alignItems='center' gap={1} p={2}>
        <CAvatarWithModal src={imageUrl} variant='organization' canEdit onEdit={onImageChange} />

        <Box>
          <Typography variant='h5'>{fantasyName}</Typography>
          <Box display='flex' alignItems='center' gap={1}>
            <Typography variant='h6' color='var(--mui-palette-grey-500)'>
              {type}
            </Typography>

            {status && <Experimental_CInformation title={DEFAULT_STATUS_DESCRIPTIONS[status]} />}
          </Box>
        </Box>
      </Box>
      <CDivider />
      <Box display='flex' justifyContent='space-between' p={2}>
        <Box>
          <Typography variant='caption' color='var(--mui-palette-grey-500)'>
            CNPJ
          </Typography>
          <Typography variant='body2'>{cnpjNormalizer(cnpj || '') || '-'}</Typography>
        </Box>
        <Box mx='auto'>
          <Typography variant='caption' color='var(--mui-palette-grey-500)'>
            Telefone
          </Typography>
          <Typography variant='body2'>{formatPhoneNumber(telephone || '') || '-'}</Typography>
        </Box>
      </Box>
    </Paper>
  )
}

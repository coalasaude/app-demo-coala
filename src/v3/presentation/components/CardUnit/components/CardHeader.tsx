import { Box } from '@mui/system'

import { CAvatarWithModal } from '@/v3/presentation/components/CAvatar'
import { DEFAULT_STATUS_DESCRIPTIONS } from '@/v3/presentation/pages/health-unit/constants/defaultStatus'

import { EditButton } from '../../EditButton'

import CardUnitVariant from './CardUnitVariant'
import CardUnitSubtitle from './CardUnitSubtitle'
import { Information } from './Information'

export const CardInstitutionalHeader = ({
  hasAvatar,
  imageUrl,
  subtitle,
  handleEdit,
  status,
  title: name,
}: {
  subtitle: string
  hasAvatar?: boolean
  imageUrl?: string
  handleEdit?: () => void
  status: string
  title: string
}) => {
  return (
    <Box display='flex' alignItems='flex-start' gap={1} width='100%'>
      {hasAvatar && <CAvatarWithModal variant='organization' src={imageUrl} />}

      <Box overflow='hidden'>
        <CardUnitVariant variant='h5' title={name} />

        <Box display='flex' alignItems='center'>
          <CardUnitSubtitle subtitle={subtitle} />

          {status === 'INACTIVE' && <Information title={DEFAULT_STATUS_DESCRIPTIONS[status]} />}
        </Box>
      </Box>
      {handleEdit && (
        <Box ml='auto'>
          <EditButton onClick={handleEdit} />
        </Box>
      )}
    </Box>
  )
}

export default CardInstitutionalHeader

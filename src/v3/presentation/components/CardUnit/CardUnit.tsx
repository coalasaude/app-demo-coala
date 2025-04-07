import { Box } from '@mui/system'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'

import { CDisplayRecord, CDivider } from '@/v3/presentation/newComponents'
import { CardContent } from '@/v3/presentation/components/Cards/CardContent'
import { CAvatarWithModal } from '@/v3/presentation/components/CAvatar'
import { Experimental_CInformation } from '@/v3/presentation/newComponents/molecules/Experimental_CInformation'

import { DEFAULT_STATUS_DESCRIPTIONS } from '../../pages/health-unit/constants/defaultStatus'

import CardUnitSubtitle from './components/CardUnitSubtitle'
import CardUnitVariant from './components/CardUnitVariant'

export const CardUnit = ({
  canView,
  hasAvatar,
  imageUrl,
  subtitle,
  handleClick,
  handleEdit,
  captionTitle,
  status,
  secondCaptionTitle,
  secondCaptionSubtitle,
  captionSubtitle,
  title: name,
  dataTestId,
  canEdit = true,
}: {
  subtitle: string
  canView: boolean
  hasAvatar?: boolean
  imageUrl?: string
  handleEdit?: () => void
  handleClick: () => void
  captionTitle: string
  secondCaptionTitle: string
  status: string
  secondCaptionSubtitle: string
  captionSubtitle: string
  title: string
  dataTestId?: string
  canEdit?: boolean
}) => {
  return (
    <CardContent
      sx={{ px: 2, py: 1, backgroundColor: '#FFFF', cursor: 'pointer', width: '100%' }}
      onClick={canView ? () => handleClick() : undefined}
      isInteractive
    >
      <Box
        display='flex'
        alignItems='flex-start'
        justifyContent='space-between'
        gap={1}
        width='100%'
        data-testid={dataTestId ? dataTestId : 'CardUnit'}
      >
        {hasAvatar && <CAvatarWithModal variant='organization' src={imageUrl} />}

        <Box overflow='hidden'>
          <CardUnitVariant variant='h5' title={name} />

          <Box display='flex' alignItems='center'>
            <CardUnitSubtitle subtitle={subtitle} />

            <Experimental_CInformation title={DEFAULT_STATUS_DESCRIPTIONS[status]} />
          </Box>
        </Box>

        <Box ml='auto'>
          {canEdit && handleEdit && (
            <ModeEditOutlineOutlinedIcon
              onClick={handleEdit}
              sx={{ fill: 'var(--mui-palette-grey-500)' }}
            />
          )}
        </Box>
      </Box>

      <CDivider sx={{ my: 1 }} />

      <Box display='flex' justifyContent='space-between'>
        <Box overflow='hidden' mr={1}>
          <CDisplayRecord label={captionTitle} value={captionSubtitle} withDivider={false} />
        </Box>
        <Box>
          <CDisplayRecord
            label={secondCaptionTitle}
            value={secondCaptionSubtitle}
            withDivider={false}
          />
        </Box>
      </Box>
    </CardContent>
  )
}

export default CardUnit

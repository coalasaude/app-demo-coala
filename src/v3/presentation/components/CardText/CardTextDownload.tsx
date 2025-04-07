import SaveAltIcon from '@mui/icons-material/SaveAlt'
import { Box } from '@mui/material'

import { spacing } from '@/utils/spacing'
import { downloadByProxy } from '@/v3/utils/downloadByProxy'

import { CDisplayRecord, CDisplayRecordProps } from '../../newComponents'

import { TextValue } from './styles'

export type CardTextDownloadProps = Omit<CDisplayRecordProps, 'textValue'> & {
  url?: string
  filename?: string
}

export const CardTextDownload = ({
  url,
  label,
  filename = '-',
  withDivider,
}: CardTextDownloadProps) => {
  const handleDownloadDocument = () => {
    if (url) downloadByProxy({ url })
  }

  return (
    <CDisplayRecord
      label={label}
      withDivider={withDivider}
      value={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: spacing(1) }}>
          <SaveAltIcon sx={{ color: 'var(--mui-palette-primary-main)' }} />
          <TextValue
            color='var(--mui-palette-primary-main)'
            noWrap
            sx={{ cursor: 'pointer' }}
            onClick={() => handleDownloadDocument()}
          >
            {filename}
          </TextValue>
        </Box>
      }
    />
  )
}

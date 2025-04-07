import { Stack } from '@mui/material'

import { AppFileModel } from '@/v3/domain/@v2/@shared/app-file.model'
import { CDisplayRecord } from '@/v3/presentation/newComponents'
import { downloadByProxy } from '@/v3/utils/downloadByProxy'

type CardContentProps = {
  textLabel?: string
  text?: string
  secondTextLabel?: string
  secondText?: string
  file?: AppFileModel
  description?: string
  descriptionLabel: string
}
export const CardDisplayContent = ({
  textLabel,
  text,
  secondText,
  secondTextLabel,
  description,
  descriptionLabel,
  file,
}: CardContentProps) => {
  const handleDownloadDocument = () => {
    if (file?.url) downloadByProxy({ url: file.url })
  }

  return (
    <Stack direction='column' spacing={'4px'}>
      {textLabel && <CDisplayRecord label={textLabel} withDivider={true} value={text} />}
      {secondTextLabel && (
        <CDisplayRecord label={secondTextLabel} withDivider={true} value={secondText} />
      )}
      {file && (
        <CDisplayRecord
          label={'Arquivo adicionado'}
          withDivider={true}
          onClick={handleDownloadDocument}
          valueProps={{ color: 'var(--mui-palette-primary-main)' }}
          value={file.formattedName}
          clickable
        />
      )}

      {description && (
        <CDisplayRecord label={descriptionLabel} withDivider={true} value={description} />
      )}
    </Stack>
  )
}

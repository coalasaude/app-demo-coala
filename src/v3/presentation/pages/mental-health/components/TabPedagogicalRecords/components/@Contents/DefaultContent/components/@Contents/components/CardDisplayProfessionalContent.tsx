import { Box } from '@mui/material'

import { AppFileModel } from '@/v3/domain/@v2/@shared/app-file.model'
import { CDisplayRecord } from '@/v3/presentation/newComponents'
import { downloadByProxy } from '@/v3/utils/downloadByProxy'

type Props = {
  textLabel?: string
  text?: string
  secondTextLabel?: string
  secondText?: string
  file?: AppFileModel
  description?: string
  descriptionLabel: string
}
export const CardDisplayProfessionalContent = ({
  textLabel,
  text,
  secondText,
  secondTextLabel,
  description,
  descriptionLabel,
  file,
}: Props) => {
  const handleDownloadDocument = () => {
    if (file?.url) downloadByProxy({ url: file.url })
  }

  return (
    <Box
      display='grid'
      flexDirection='column'
      gap={'4px'}
      gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 1fr 1fr']}
    >
      {textLabel && (
        <CDisplayRecord
          boxProps={{ overflow: 'hidden' }}
          label={textLabel}
          withDivider={true}
          value={text}
        />
      )}
      {secondTextLabel && (
        <CDisplayRecord
          boxProps={{ overflow: 'hidden' }}
          label={`Registro | ${secondTextLabel}`}
          withDivider={true}
          value={secondText}
        />
      )}
      {file && (
        <CDisplayRecord
          boxProps={{ overflow: 'hidden' }}
          label={'Arquivo adicionado'}
          withDivider={true}
          onClick={handleDownloadDocument}
          noWrap
          valueProps={{ color: 'var(--mui-palette-primary-main)' }}
          value={file.formattedName}
          clickable
        />
      )}

      {description && (
        <CDisplayRecord
          boxProps={{ gridColumn: '1/-1' }}
          label={descriptionLabel}
          withDivider={true}
          value={description}
        />
      )}
    </Box>
  )
}

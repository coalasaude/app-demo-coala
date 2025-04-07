import { Typography } from '@mui/material'

import { CDisplayRecord, CDivider, CDisplayRecordProps } from '@/v3/presentation/newComponents'

import CardBody from '../CardBody'
import Paper from '../Paper'

import CardInstitutionalHeader from './components/CardHeader'

export const CardInstitution = ({
  imageUrl,
  subtitle,
  status,
  title: name,
  bodyItems,
}: {
  subtitle: string
  hasAvatar?: boolean
  imageUrl?: string
  status: string
  title: string
  bodyItems: CDisplayRecordProps[]
}) => {
  return (
    <Paper
      sx={{
        px: 2,
        pt: 4,
      }}
    >
      <CardInstitutionalHeader
        status={status}
        title={name}
        subtitle={subtitle}
        hasAvatar
        imageUrl={imageUrl}
      />

      <CDivider sx={{ mt: 2 }} />

      <CardBody py={2} px={0}>
        {bodyItems.map((item, index) => (
          <CDisplayRecord
            {...item}
            withDivider={false}
            value={
              <Typography lineHeight={1.5} variant='h6' fontWeight={400}>
                {item.value}
              </Typography>
            }
            key={`${item.value}${index}`}
          />
        ))}
      </CardBody>
    </Paper>
  )
}

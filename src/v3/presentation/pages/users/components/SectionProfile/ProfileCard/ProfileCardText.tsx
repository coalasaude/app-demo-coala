import { Typography } from '@mui/material'

import { CDisplayRecord } from '@/v3/presentation/newComponents'

export const ProfileCardText = ({ label, value }: { label: string; value?: string }) => {
  const splintedValue = (value || '').split(' ')
  const formattedValue =
    splintedValue.length > 3
      ? splintedValue.map((word, index) => (index == 0 ? `${word.charAt(0)}.` : word)).join(' ')
      : value

  return (
    <CDisplayRecord
      withDivider={false}
      label={label}
      clickable
      value={
        formattedValue ? (
          <Typography variant='body2' color='grey.600' noWrap>
            {formattedValue}
          </Typography>
        ) : (
          '-'
        )
      }
    />
  )
}

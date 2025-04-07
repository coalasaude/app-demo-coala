import { Tab as MTab, TabProps } from '@mui/material'

import { spacing } from '@/v3/presentation/utils/spacing'

export const Tab = (props: TabProps) => {
  return (
    <MTab
      {...props}
      sx={{
        px: spacing(2),
        py: spacing(1),
        textTransform: 'unset',
        minHeight: '36px',
        color: 'var(--gray_600)',
        ...(props.sx || {}),
      }}
    />
  )
}

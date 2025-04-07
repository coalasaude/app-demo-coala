import { Tabs as MTabs, TabsProps } from '@mui/material'

export * from './Tab'
export const Tabs = (props: TabsProps) => {
  return (
    <MTabs
      variant='scrollable'
      scrollButtons='auto'
      {...props}
      sx={{
        minHeight: 'unset',
        borderBottom: '1px solid var(--mui-palette-grey-100)',
        ...(props.sx || {}),
      }}
    />
  )
}

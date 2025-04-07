import { Tab as MTab, TabProps } from '@mui/material'

export const Tab = (props: TabProps) => {
  return (
    <MTab
      {...props}
      sx={{
        ...(props.sx || {}),
      }}
    />
  )
}

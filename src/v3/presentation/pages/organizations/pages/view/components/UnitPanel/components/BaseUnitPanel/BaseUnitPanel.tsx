import { Box } from '@mui/material'
type Props = {
  id: string
  children: React.ReactNode
  isMessagePanel?: boolean
}

export const BaseUnitPanel = ({ children, isMessagePanel, id }: Props) => {
  return (
    <Box
      id={id}
      bgcolor={isMessagePanel ? 'var(--mui-palette-primary-light)' : 'var(--mui-palette-grey-100)'}
      mt={2}
      py={2}
      pl={[1, 2]}
      pr={2}
      borderRadius={4}
      height={110}
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      {children}
    </Box>
  )
}

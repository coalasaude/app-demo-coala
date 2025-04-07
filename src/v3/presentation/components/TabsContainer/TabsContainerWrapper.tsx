import { Box } from '@mui/material'

interface TabsContainerWrapperProps {
  children: React.ReactNode
}

export const TabsContainerWrapper = ({ children }: TabsContainerWrapperProps) => {
  return <Box my={2}>{children}</Box>
}

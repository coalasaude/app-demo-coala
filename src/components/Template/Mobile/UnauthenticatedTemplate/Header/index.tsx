import { Box } from '@mui/material'

export const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      bgcolor='var(--mui-palette-primary-main)'
      p={4}
      boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.25)'}
      flexDirection='column'
      sx={{
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
      }}
    >
      {children}
    </Box>
  )
}

export default Header

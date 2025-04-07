import { Box, Button } from '@mui/material'
import { useRouter } from 'next/router'

export const FooterButtons = ({ onClick }: { onClick: () => void }) => {
  const router = useRouter()

  return (
    <Box mt={2} display='flex' justifyContent='flex-end'>
      <Button size='medium' variant='outlined' onClick={() => router.back()}>
        Cancelar
      </Button>
      <Box mr={2} />
      <Button size='medium' onClick={onClick}>
        Invalidar
      </Button>
    </Box>
  )
}

export default FooterButtons

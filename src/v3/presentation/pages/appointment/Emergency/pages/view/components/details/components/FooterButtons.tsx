import { Box, Button } from '@mui/material'
import { useRouter } from 'next/router'

export const FooterButtons = ({
  onClick,
  title,
}: {
  onClick: () => Promise<boolean>
  title?: string
}) => {
  const router = useRouter()

  return (
    <Box mt={2} display='flex' justifyContent='flex-end'>
      {!title && (
        <Button size='medium' variant='outlined' onClick={() => router.back()}>
          Cancelar
        </Button>
      )}
      <Box mr={2} />
      <Button size='medium' onClick={onClick}>
        {title || 'Finalizar'}
      </Button>
    </Box>
  )
}

export default FooterButtons

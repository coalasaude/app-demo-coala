import { Box, Button } from '@mui/material'
import { useRouter } from 'next/router'

import { schema } from '../types'

export const FooterButtons = ({
  handleSubmit,
  onSubmit,
}: {
  handleSubmit: any
  onSubmit: (modalValues: typeof schema) => Promise<void>
}) => {
  const router = useRouter()

  return (
    <Box mt={2} display='flex' justifyContent='flex-end'>
      <Button size='medium' variant='outlined' onClick={() => router.back()}>
        Cancelar
      </Button>
      <Box mr={2} />
      <Button size='medium' onClick={handleSubmit(onSubmit)}>
        Registrar
      </Button>
    </Box>
  )
}

export default FooterButtons

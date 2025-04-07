import { Box } from '@mui/material'

import { CButton } from '@/v3/presentation/newComponents'

export const FooterButtons = ({
  title,
  onClose,
  loading,
}: {
  title?: string
  loading?: boolean
  onClose: (isSuccess: boolean) => void
}) => {
  return (
    <Box mt={2} display='flex' justifyContent='flex-end'>
      {!title && (
        <CButton
          size='medium'
          variant='secondary'
          onClick={() => onClose(false)}
          data-testid='modalFooterButton'
        >
          Cancelar
        </CButton>
      )}
      <Box mr={2} />
      <CButton loading={loading} size='medium' type='submit' data-testid='modalFooterButton'>
        {title || 'Finalizar'}
      </CButton>
    </Box>
  )
}

export default FooterButtons

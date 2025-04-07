import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Typography } from '@mui/material'

import ButtonIcon from '@/v3/presentation/components/ButtonIcon'

export const AlertErrorManyRequests = ({ onCloseAlert }: { onCloseAlert: () => void }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--mui-palette-secondary-dark)',
        borderRadius: 1,
        p: '4px',
        pl: 1.5,
        mb: 2,
      }}
    >
      <CancelOutlinedIcon sx={{ fontSize: 18, color: 'white' }} />
      <Typography pl={2} variant='body1' color='white' width='100%'>
        É permitido solicitar apenas uma análise por vez. Aguarde a conclusão da atual para fazer
        outra.
      </Typography>
      <ButtonIcon
        icon={<CloseIcon sx={{ fontSize: 18, color: 'white' }} />}
        onClick={onCloseAlert}
      />
    </Box>
  )
}

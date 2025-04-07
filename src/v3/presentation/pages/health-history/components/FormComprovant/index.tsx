import { Box, Typography } from '@mui/material'

import { CCheckboxGrid } from '@/v3/presentation/components/CCheckboxGrid'
import { CFileInputAsyncControlled } from '@/v3/presentation/newComponents/implementations/form/CFileInputAsyncControlled'

interface FormComprovantProps {
  vaccineOptions: { value: number; label: string }[]
  handleAsyncUpload: (file: File) => Promise<number>
}

export const FormComprovant = ({ vaccineOptions, handleAsyncUpload }: FormComprovantProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography variant='h6'>Novo comprovante</Typography>
      <Box sx={{ width: ['100%', '50%'] }}>
        <CFileInputAsyncControlled
          name='document'
          label='Comprovante de vacinação*'
          accept='.pdf, image/*'
          onUploadFunc={handleAsyncUpload}
        />
      </Box>
      <CCheckboxGrid
        name='vaccines'
        label='Categoria*'
        rules={{ required: true }}
        options={vaccineOptions}
        maxItemColumns={4}
      />
    </Box>
  )
}

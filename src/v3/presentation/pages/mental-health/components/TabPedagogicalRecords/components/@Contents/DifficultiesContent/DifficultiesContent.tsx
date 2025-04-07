import { Box, Typography } from '@mui/material'

import { ManageContentProps } from '../../../types/manage-content.type'

import { AddDifficultiesForm } from './components/AddDifficultiesForm/AddDifficultiesForm'
import { EditDifficultiesForm } from './components/EditDifficultiesForm/EditDifficultiesForm'

export const DifficultiesContent = ({ id, userId, onBackToRegisters }: ManageContentProps) => {
  return (
    <Box>
      <Typography variant='h4' mb={[3, 2]}>
        Dificuldades ou desafios
      </Typography>
      {!id && <AddDifficultiesForm userId={userId} onFinish={onBackToRegisters} />}
      {!!id && <EditDifficultiesForm id={id} userId={userId} onFinish={onBackToRegisters} />}
    </Box>
  )
}

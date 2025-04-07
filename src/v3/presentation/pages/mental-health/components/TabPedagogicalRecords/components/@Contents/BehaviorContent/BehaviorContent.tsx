import { Box, Typography } from '@mui/material'

import { ManageContentProps } from '../../../types/manage-content.type'

import { AddBehaviorForm } from './components/AddBehaviorForm/AddBehaviorForm'
import { EditBehaviorForm } from './components/EditBehaviorForm/EditBehaviorForm'

export const BehaviorContent = ({ id, userId, onBackToRegisters }: ManageContentProps) => {
  return (
    <Box>
      <Typography variant='h4' mb={[3, 1]}>
        Comportamentos
      </Typography>
      {!id && <AddBehaviorForm userId={userId} onFinish={onBackToRegisters} />}
      {!!id && <EditBehaviorForm id={id} userId={userId} onFinish={onBackToRegisters} />}
    </Box>
  )
}

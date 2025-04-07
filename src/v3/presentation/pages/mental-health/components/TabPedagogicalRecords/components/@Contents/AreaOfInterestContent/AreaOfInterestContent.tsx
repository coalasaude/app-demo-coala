import { Box, Typography } from '@mui/material'

import { ManageContentProps } from '../../../types/manage-content.type'

import { AddAreaOfInterestForm } from './components/AddAreaOfInterestForm/AddAreaOfInterestForm'
import { EditAreaOfInterestForm } from './components/EditAreaOfInterestForm/EditAreaOfInterestForm'

export const AreaOfInterestContent = ({ id, userId, onBackToRegisters }: ManageContentProps) => {
  return (
    <Box>
      <Typography variant='h4' mb={[3, 1]}>
        Área de interesse
      </Typography>
      {!id && <AddAreaOfInterestForm userId={userId} onFinish={onBackToRegisters} />}
      {!!id && <EditAreaOfInterestForm id={id} userId={userId} onFinish={onBackToRegisters} />}
    </Box>
  )
}

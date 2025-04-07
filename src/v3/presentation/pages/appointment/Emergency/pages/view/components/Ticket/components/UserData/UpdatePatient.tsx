import { EditOutlined } from '@mui/icons-material'
import { Box } from '@mui/material'
import router from 'next/router'

import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'

export const UpdatePatient = () => {
  return (
    <Box
      display='flex'
      alignItems='center'
      className='cursor-pointer'
      onClick={() => {
        router.push(
          bindPathParams(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.EDIT.path, {
            id: router.query.id,
          })
        )
      }}
    >
      <EditOutlined sx={{ mr: 1 }} />
    </Box>
  )
}

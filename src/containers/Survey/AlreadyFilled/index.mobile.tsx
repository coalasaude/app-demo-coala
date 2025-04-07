import React from 'react'
import { Box } from '@mui/system'

import AlreadyFilledMobile from '/public/assets/svg/Survey/SurveyAlreadyFilledMobile.svg'

export const SurveyAlreadyFilledMobile = () => {
  return (
    <Box sx={{ background: 'white', position: 'relative', padding: 2, my: 2, borderRadius: 2 }}>
      <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
        <AlreadyFilledMobile />
      </Box>
    </Box>
  )
}

export default SurveyAlreadyFilledMobile

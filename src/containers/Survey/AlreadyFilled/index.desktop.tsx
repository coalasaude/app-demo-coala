import React from 'react'
import { Box } from '@mui/system'

import SurveyAlreadyFilled from '/public/assets/svg/Survey/SurveyAlreadyFilled.svg'

export const SurveyAlreadyFilledDesktop = () => {
  return (
    <Box sx={{ background: 'white', position: 'relative', padding: 2, my: 2, borderRadius: 2 }}>
      <Box display='flex' justifyContent='center'>
        <SurveyAlreadyFilled />
      </Box>
    </Box>
  )
}

export default SurveyAlreadyFilledDesktop

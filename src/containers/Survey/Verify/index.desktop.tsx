import React from 'react'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'

import SurveyVerify from '/public/assets/svg/Survey/SurveyVerify.svg'
import SurveyVerifyActive from '/public/assets/svg/Survey/SurveyVerifyActive.svg'

import { UNAUTHENTICATED_ROUTES } from '@/constants/routes'

export const SurveyVerifyDesktop = ({ isActivateUser }: { isActivateUser: boolean }) => {
  const router = useRouter()

  return (
    <Box sx={{ background: 'white', position: 'relative', padding: 2, my: 2, borderRadius: 2 }}>
      {!isActivateUser ? (
        <Box mt={4} mx={2}>
          <SurveyVerify />
          <Box mt={-1} display='flex' color='(--secondary_300)' justifyContent='left'>
            <Button
              variant='contained'
              onClick={() => router.push(`${UNAUTHENTICATED_ROUTES.LOGIN}`)}
            >
              Ativar agora
            </Button>
          </Box>
        </Box>
      ) : (
        <Box mt={2} mx={2}>
          <SurveyVerifyActive />
        </Box>
      )}
    </Box>
  )
}

export default SurveyVerifyDesktop

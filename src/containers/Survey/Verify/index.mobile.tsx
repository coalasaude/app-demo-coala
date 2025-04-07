import React from 'react'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'

import VerifyMobile from '/public/assets/svg/Survey/SurveyVerifyMobile.svg'
import VerifyMobileActive from '/public/assets/svg/Survey/SurveyVerifyMobileActive.svg'

import Button from '@/components/Button'
import { UNAUTHENTICATED_ROUTES } from '@/constants/routes'

export const SurveyVerifyMobile = ({ isActivateUser }: { isActivateUser: boolean }) => {
  const router = useRouter()

  return (
    <Box sx={{ background: 'white', position: 'relative', padding: 2, my: 2, borderRadius: 2 }}>
      <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
        {!isActivateUser ? (
          <>
            <Box mb={2}>
              <VerifyMobile style={{ width: '104%' }} />
            </Box>
            <Button
              color='pink_gradient'
              fullWidth
              onClick={() => router.push(`${UNAUTHENTICATED_ROUTES.LOGIN}`)}
            >
              Ativar agora
            </Button>
          </>
        ) : (
          <Box mb={2}>
            <VerifyMobileActive style={{ width: '104%' }} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default SurveyVerifyMobile

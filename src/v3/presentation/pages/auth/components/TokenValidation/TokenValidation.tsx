import { Box } from '@mui/material'
import { ReactNode, useState } from 'react'

import { mobilePhoneOrEmailNormalizer } from '@/components/Forms/normalizers/phoneOrEmailNormalizer'
import { useLoadingFeedback } from '@/v3/presentation/hooks/useLoadingFeedback'
import { CCodeInput } from '@/v3/presentation/newComponents'
import { CButton } from '@/v3/presentation/newComponents/atoms/CButton'

import { ChangeButtonText } from '../ChangeButtonText'
import { Countdown } from '../Countdown/Countdown'

export interface ITokenValidation {
  onSubmit: (code: string) => Promise<void>
  goBack?: () => void
  onResendToken?: () => void
  title: ReactNode
  access?: string
}

export const TokenValidation = ({
  onSubmit,
  title,
  onResendToken,
  access,
  goBack,
}: ITokenValidation) => {
  const [code, setCode] = useState('')
  const { execute, isLoading } = useLoadingFeedback(() => onSubmit(code))

  return (
    <Box>
      {title}
      {access && (
        <ChangeButtonText onClick={goBack} text={mobilePhoneOrEmailNormalizer(access)} mb={4} />
      )}
      <CCodeInput label='' value={code} onChange={setCode} onlyNumbers />
      <Box mt={4}>
        <CButton fullWidth loading={isLoading} onClick={execute}>
          Enviar
        </CButton>
      </Box>
      {onResendToken && (
        <Countdown
          seconds={60}
          display={'flex'}
          justifyContent={'center'}
          mt={1}
          renderComponent={({ done, timeLeft, setTimeLeft }) => (
            <CButton
              variant='link'
              disabled={!done}
              onClick={() => {
                onResendToken()
                setTimeLeft(60)
              }}
            >
              {done ? 'Reenviar código de acesso' : `Não recebi meu código (${timeLeft}s)`}
            </CButton>
          )}
        />
      )}
    </Box>
  )
}

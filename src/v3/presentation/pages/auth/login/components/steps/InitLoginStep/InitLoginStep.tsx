import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import WhatsAppIcon from '/public/assets/svg/WhatsAppIcon.svg'

import { useRouter } from 'next/router'

import { CForm } from '@/components/Forms'
import { mobilePhoneOrEmailNormalizer } from '@/components/Forms/normalizers/phoneOrEmailNormalizer'
import { useCWizardUrlControlContext } from '@/v3/presentation/hooks/useCWizardUrlControl'
import { CButton } from '@/v3/presentation/newComponents/atoms/CButton'
import { CInputControlled } from '@/v3/presentation/newComponents'
import { WebViewManager } from '@/services/WebView'
import { useMutateInitLogin } from '@/v3/presentation/hooks/api/@v2/auth/useMutateInitLogin'
import { extractApiError } from '@/v3/utils/extract-api-error'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { NEW_ROUTES } from '@/constants/routes'

import { IStepLoginProps } from '../../../types'
import { IsCoalaModal } from '../../modals/IsCoalaModal'
import { WhatsAppModal } from '../../modals/WhatsAppModal'

import { IFormAccess, accessSchema } from './schema'
import { StringsMap, stringsMap } from './strings.map'

export const InitLoginStep = ({ resetAuthentication }: IStepLoginProps) => {
  const { nextStep } = useCWizardUrlControlContext()
  const { mutateAsync, isPending: isLoadingInitLogin } = useMutateInitLogin({
    skipErrorToast: true,
  })

  const { handleModal } = useModalContext()

  const form = useForm({ resolver: yupResolver(accessSchema) })
  const router = useRouter()
  const [strings, setStrings] = useState<StringsMap>(stringsMap.default)
  const [retries, setRetries] = useState(0)

  const onSubmit = async (values: IFormAccess) => {
    try {
      const data = await mutateAsync({
        access: values.access,
      })

      if (data) {
        resetAuthentication({
          activationStatus: data.activationStatus,
          access: values.access,
          userName: data.userName,
        })

        nextStep?.()
      }
    } catch (error: any) {
      const message = extractApiError(error)

      if (error.response.status == 404 && retries < 1) {
        handleModal(
          <IsCoalaModal
            onConfirm={() => {
              const accessType = !values.access?.includes('@') ? 'email' : 'phone'
              setStrings(stringsMap[accessType])
              form.reset()
              setRetries(retries + 1)
            }}
            onClose={() => handleModal()}
          />,
        )
      } else if (error.response.status == 404 && retries >= 1) {
        handleModal(<WhatsAppModal />)
      }

      form.setError('access', {
        type: 'manual',
        message: message || 'Erro ao iniciar login',
      })
    }
  }

  const sendToUserRegistrationRoute = () => {
    router.push(NEW_ROUTES.UNAUTHENTICATED.REGISTRATION.path)
  }

  return (
    <Box>
      <Typography variant='h1' maxWidth={[280, 383]} mb={6}>
        {strings?.title}
      </Typography>
      <CForm id='myForm' form={form} onSubmit={onSubmit}>
        <CInputControlled
          name='access'
          label={strings?.label}
          size='small'
          placeholder={strings?.placeholder}
          fullWidth
          id='access'
          transform={{ output: mobilePhoneOrEmailNormalizer }}
        />
        <Box mt={4}>
          <CButton variant='primary' fullWidth type='submit' loading={isLoadingInitLogin}>
            Continuar
          </CButton>
        </Box>
        <Box mt={4} display='flex' justifyContent='center'>
          <Typography
            variant='h4'
            fontWeight={400}
            color='primary'
            display='inline'
            onClick={sendToUserRegistrationRoute}
            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            {strings?.subtitle}
          </Typography>
        </Box>
      </CForm>
      <Box
        position='absolute'
        bottom={30}
        right={30}
        sx={{ cursor: 'pointer' }}
        onClick={() => WebViewManager.open(process.env.WHATSAPP_SUPPORT_URL, '_blank')}
      >
        <WhatsAppIcon />
      </Box>
    </Box>
  )
}

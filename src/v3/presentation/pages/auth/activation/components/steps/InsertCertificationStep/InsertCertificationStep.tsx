import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { NEW_ROUTES } from '@/constants/routes'
import { CFileInputControlled } from '@/v3/presentation/newComponents/implementations/form/CFileInputControlled'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { CButton } from '@/v3/presentation/newComponents/atoms/CButton'
import { CInputControlled } from '@/v3/presentation/newComponents'
import { useMutateSaveCertificatePassword } from '@/v3/presentation/hooks/api/@v2/users/users/useMutateSaveCertificatePassword'

import { ChangeButtonText } from '../../../../components/ChangeButtonText'

import { ICertificatePassword, certificateSchema } from './schema'

export const InsertCertificationStep = () => {
  const router = useRouter()
  const { logout, auth, setAuth } = useAuth()
  const { mutateAsync: saveCertificatePasswordMutate, isPending: isLoading } =
    useMutateSaveCertificatePassword()
  const form = useForm({
    resolver: yupResolver(certificateSchema),
    defaultValues: {
      hasToSavePassword: auth.user?.isPendingCertificatePassword,
      hasToUploadCertificate: auth.user?.isPendingCertificateUpload,
    },
  })

  const onSubmit = async ({ file, password }: ICertificatePassword) => {
    await saveCertificatePasswordMutate({ password, certificate: file }).then(() => {
      if (auth.user) {
        auth.user.isPendingCertificatePassword = false
        auth.user.isPendingCertificateUpload = false
        setAuth({
          user: auth.user,
        })
      }
    })

    router.push(auth.redirectPage || NEW_ROUTES.AUTHENTICATED.HELLO.path)
  }

  const onLogout = () => {
    logout()
    router.push(NEW_ROUTES.AUTHENTICATED.HELLO.path)
  }

  return (
    <Box>
      <ChangeButtonText buttonText='voltar ao login' onClick={onLogout} mb={4} />
      <CForm id='certificateForm' form={form} onSubmit={onSubmit}>
        {auth.user?.isPendingCertificateUpload && (
          <>
            <Typography variant='h1' maxWidth={340} mb={1}>
              Envio de certificado digital
            </Typography>
            <Typography>
              Faça o envio do seu certificado para que você consiga utilizá-lo na hora de assinar
              documentos.
            </Typography>
            <Box mt={2}>
              <CFileInputControlled label='Selecionar certificado' accept='.pfx' name={'file'} />
            </Box>
          </>
        )}
        {auth.user?.isPendingCertificatePassword && (
          <>
            <Typography variant='h1' maxWidth={340} mb={1}>
              Senha do certificado
            </Typography>
            <Typography>
              Insira a senha do seu certificado para que você consiga utilizá-lo na hora de assinar
              documentos.
            </Typography>
            <Box mt={2}>
              <CInputControlled
                label='Senha do certificado'
                name={'password'}
                placeholder='Senha do certificado'
                inputType='password'
              />
            </Box>
          </>
        )}
        <Box mt={4}>
          <CButton fullWidth type='submit' loading={isLoading}>
            Enviar
          </CButton>
        </Box>
      </CForm>
    </Box>
  )
}

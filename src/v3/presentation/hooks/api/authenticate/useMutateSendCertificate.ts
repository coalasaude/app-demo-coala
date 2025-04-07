import { useMutation } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { uploadFileCertificate } from '@/v3/infra/services/me/certificate'

import { useAuth } from '../../useAuth'

export const useMutateUploadCertificate = () => {
  const { auth, setAuth } = useAuth()
  const { showSnackBar } = useLayout()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: uploadFileCertificate,
    onSuccess: (data) => {
      showSnackBar({
        type: 'success',
        message: 'Senha redefinida com sucesso',
      })

      if (auth.user && data) {
        const user = auth.user
        user.isPendingCertificateUpload = false
        setAuth({
          user,
        })
      }
    },
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Erro ao enviar certificado',
      })

      return { error }
    },
  })

  return {
    uploadCertificateMutate: mutateAsync,
    ...rest,
  }
}

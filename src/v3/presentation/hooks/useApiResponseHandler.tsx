import { useTranslation } from 'react-i18next'

import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { extractApiError } from '@/v3/utils/extract-api-error'

export const useApiResponseHandler = () => {
  const { t } = useTranslation()
  const { showSnackBar } = useLayout()

  const onSuccessMessage = (message: string) => {
    showSnackBar({
      type: 'success',
      message: message,
    })
  }

  const onErrorMessage = (error: IErrorResp) => {
    const message = extractApiError(error) || t('api.InternalServerError')

    showSnackBar({
      type: 'error',
      message,
    })
  }

  const onInfoMessage = (message: string) => {
    showSnackBar({
      type: 'info',
      message,
    })
  }

  return {
    onSuccessMessage,
    onErrorMessage,
    onInfoMessage,
  }
}

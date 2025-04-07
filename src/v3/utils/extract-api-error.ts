import { t } from 'i18next'

import { IErrorResp } from '@/types/error.type'

import { extractStringValues } from './extract-string-values'

export const extractApiError = (error: IErrorResp) => {
  const errorCode = error.response?.data.error
  const in18nPath = `api.${errorCode}` as any
  const in18nError = errorCode ? t(in18nPath, '') : ''

  const message = in18nError || error.response?.data?.message
  if (!message && error.response?.data && typeof error.response?.data === 'object') {
    const err = extractStringValues(error.response?.data).join(', ')
    const errorCodePath = `api.${err}` as any
    const translatedErrorCode = t(errorCodePath, '')
    return translatedErrorCode || err
  }

  if (message === 'Forbidden resource') return t('api.ForbiddenResource')

  return message
}

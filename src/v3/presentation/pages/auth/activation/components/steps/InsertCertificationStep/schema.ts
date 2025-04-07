import * as yup from 'yup'

import { MAX_FILE_SIZE } from '@/constants/fileSize'

export type ICertificatePassword = {
  file?: File
  password: string
  hasToSavePassword: boolean
  hasToUploadCertificate: boolean
}

export const certificateSchema = yup.object({
  file: yup
    .mixed()
    .test('is-valid-size', 'Arquivo muito grande. O tamanho máximo é de 10MB', (value: any) => {
      if (!value) return true
      if (value.size < MAX_FILE_SIZE) return true
    })
    .when('hasToUploadCertificate', {
      is: (hasToUploadCertificate: boolean) => hasToUploadCertificate,
      then: (schema) => schema.required(),
    }),
  password: yup.string().required(),
  hasToSavePassword: yup.boolean().optional(),
  hasToUploadCertificate: yup.boolean().optional(),
})

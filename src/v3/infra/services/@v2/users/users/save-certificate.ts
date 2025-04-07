import apiRequest from '../../../api'

export type SaveCertificatePasswordPayload = {
  password: string
  certificate?: File
}

export async function saveCertificate(params: SaveCertificatePasswordPayload) {
  const formData = new FormData()
  formData.append('password', params.password)
  params.certificate && formData.append('certificate', params.certificate)

  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/certificate',
    body: formData,
    cType: 'multipart/form-data',
  })
}

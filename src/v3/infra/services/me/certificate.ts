import apiRequest from '../api'

export const uploadFileCertificate = (data: { file: File }) => {
  const formData = new FormData()
  formData.append('file', data.file)

  return apiRequest<boolean>({
    path: 'me/upload-certificate',
    method: 'POST',
    throwError: true,
    cType: 'multipart/form-data',
    useApiFilters: false,
    body: formData,
  }) as Promise<boolean>
}

import apiRequest from '../../../api'

interface AddImageParams {
  userId: number
  image: File
}

export async function addImageUser({ userId, image }: AddImageParams) {
  const formData = new FormData()
  formData.append('image', image)

  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/images',
    cType: 'multipart/form-data',
    body: formData,
    pathParams: { userId },
  })
}

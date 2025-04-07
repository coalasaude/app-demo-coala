import apiRequest from '../../../api'

export async function notifyActivateUser({
  userId,
  institutionId,
}: {
  userId: number,
  institutionId: number,
}) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/notify-activate',
    pathParams: {
      userId,
    },
    queryParams: {
      institutionId,
    },
  })
}

export const getJistisUrl = ({ roomId, jwt }: { roomId: string; jwt?: string }) => {
  const meetUrl = process.env.ROOM_MEET_BASE_URL
    ? `https://${process.env.ROOM_MEET_BASE_URL}/`
    : 'https://meet.jit.si/'
  const apiKey = process.env.JITSI_API_KEY ? `${process.env.JITSI_API_KEY}/` : ''
  const queryParams = jwt
    ? `?jwt=${jwt}&lang=pt&config.prejoinPageEnabled=false`
    : '?lang=pt&config.prejoinPageEnabled=false'

  return `${meetUrl}${apiKey}${roomId}${queryParams}`
}

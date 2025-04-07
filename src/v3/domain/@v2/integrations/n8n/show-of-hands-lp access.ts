export const addShowOfHandsLPAccess = async ({
  name, email, institutionName, phone, acceptWhats, type, explain, search
}: {
  name: string, email: string, phone: string, institutionName: string,
  type: string, acceptWhats: boolean, search?: string, explain?: string
}) => {

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${day}/${month}/${year} ${hours}:${minutes}`
  }

  const data = Object.fromEntries(
    Object.entries({
      name,
      email,
      phone,
      institutionName,
      type,
      explain,
      search,
      acceptWhats,
      date: formatDate(new Date())
    }).filter(([, value]) => value !== undefined)
  ) as Record<string, string>

  const response = await fetch('https://automations.coalasaude.com.br/webhook/016eee74-e6ac-400d-ac33-a432fc0e4d6c', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(data)
  })
  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    return { error: errorData || { status: response.status, message: response.statusText } }
  }

  return response.json()
}
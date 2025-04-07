import { RoleModel } from '@/v3/domain/@v2/users/role/role.model'

export const addShowOfHandsMentalHealth = async ({ name, email, roles, event }:
  { event: string, name?: string, roles?: RoleModel[], email?: string }) => {

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
      name: name,
      email: email,
      institutionsNames: roles?.map((e) => e.institution?.fantasyName).join(',') || undefined,
      institutionsIds: roles?.map((e) => e.institution?.id).join(',') || undefined,
      profiles: roles?.map((e) => e.profile.name).join(',') || 'Responsável',
      event: event,
      date: formatDate(new Date()),
    }).filter(([, value]) => value !== undefined)
  ) as Record<string, string>

  const response = await fetch('https://automations.coalasaude.com.br/webhook/352693bd-6b2d-4082-a8bb-c0b7564b55f4', {
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
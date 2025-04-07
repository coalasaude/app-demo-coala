export type OrgType = 'institution' | 'brand' | 'network'

export const getOrganizationType = (orgType: OrgType, id?: number | undefined) => {
  if (!id) return
  const key = `${orgType}Id`
  return { [key]: id }
}

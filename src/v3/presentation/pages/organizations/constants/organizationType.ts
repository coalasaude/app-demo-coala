export enum OrganizationType {
  INSTITUTION = 'INSTITUTION',
  BRAND = 'BRAND',
  NETWORK = 'NETWORK',
}

export const ORGANIZATION_TYPE_DESCRIPTION = {
  [OrganizationType.INSTITUTION]: 'Instituição',
  [OrganizationType.BRAND]: 'Marca',
  [OrganizationType.NETWORK]: 'Rede',
}

export const ORGANIZATION_TYPE_OPTIONS = [
  {
    label: ORGANIZATION_TYPE_DESCRIPTION[OrganizationType.INSTITUTION],
    value: OrganizationType.INSTITUTION,
  },
  {
    label: ORGANIZATION_TYPE_DESCRIPTION[OrganizationType.BRAND],
    value: OrganizationType.BRAND,
  },
  {
    label: ORGANIZATION_TYPE_DESCRIPTION[OrganizationType.NETWORK],
    value: OrganizationType.NETWORK,
  },
]

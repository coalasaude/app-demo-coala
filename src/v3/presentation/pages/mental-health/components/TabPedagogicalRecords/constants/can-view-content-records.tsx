import { labelContent } from './label-content'

type PermissionKeys =
  | 'canViewInternRecord'
  | 'canViewExternalRecord'
  | 'canViewBehavior'
  | 'canViewChallenge'
  | 'canViewInterestArea'

type Props = {
  label: string
  permissions: Record<PermissionKeys, boolean>
}

const labelPermissionMap: Record<string, keyof Props['permissions']> = {
  [labelContent.AREAS_OF_INTEREST]: 'canViewInterestArea',
  [labelContent.BEHAVIORS]: 'canViewBehavior',
  [labelContent.DIFFICULTIES_OR_CHALLENGES]: 'canViewChallenge',
  [labelContent.EXTERNAL_RECORDS]: 'canViewExternalRecord',
  [labelContent.COALA_RECORDS]: 'canViewInternRecord',
}

export const canViewContentRecords = ({ label, permissions }: Props): boolean => {
  const permissionKey = labelPermissionMap[label]
  const result = permissions[permissionKey] ?? false

  return result
}

export default canViewContentRecords

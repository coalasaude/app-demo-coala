import { useAuth } from '@/v3/presentation/hooks/useAuth'

export const useHasPermission = (
  permissions: string[],
  options?: { institutionId?: number }
): boolean[] => {
  const { auth } = useAuth()

  if (options?.institutionId) {
    const permissionWithInstitutionId = permissions.map(
      (permission) =>
        !!auth.permissions?.some(
          ({ name, institution_id }) =>
            permission === name && institution_id === options?.institutionId
        )
    )
    return permissionWithInstitutionId
  }

  const permissionsSet = permissions.map(
    (permission) => !!auth.permissions?.some(({ name }) => permission === name)
  )

  return permissionsSet
}

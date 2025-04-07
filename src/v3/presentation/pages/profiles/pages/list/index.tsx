import { Box } from '@mui/material'
import { useRouter } from 'next/router'

import { TableSkeleton } from '@/components/Skeletons/TableSkeleton'
import { NEW_ROUTES } from '@/constants/routes'
import useMediaQuery from '@/hooks/useMediaQuery'
import { PageHeader } from '@/v3/presentation/newComponents'
import { useFetchBrowseProfiles } from '@/v3/presentation/hooks/api/@v2/users/profile/useFetchBrowseProfiles'

import ProfilesTable from '../../components/ProfilesTable'

export const Profiles = () => {
  const router = useRouter()
  const { profiles, isLoading } = useFetchBrowseProfiles()
  const isSmallDevice = useMediaQuery('sm')

  const handleBack = () => {
    router.push(NEW_ROUTES.AUTHENTICATED.USERS.ACCESS.path)
  }

  const handleAdd = () => {
    router.push(NEW_ROUTES.AUTHENTICATED.USERS.PROFILES.ADD.path)
  }

  return (
    <>
      <PageHeader
        title='Perfis de acesso'
        onBack={handleBack}
        actionButtonProps={{
          children: 'Adicionar perfil',
          onClick: handleAdd,
          fullWidth: isSmallDevice,
        }}
      />

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <Box>
          <ProfilesTable data={profiles?.data || []} />
        </Box>
      )}
    </>
  )
}

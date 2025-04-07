import { Box } from '@mui/material'
import { useRouter } from 'next/router'

import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { useFetchReadMedicine } from '@/v3/presentation/hooks/api/@v2/health-history/medicine/useFetchReadMedicine'
import { PageHeader } from '@/v3/presentation/newComponents'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'

import { FormViewContainer } from './components/FormViewContainer'

export const MedicineViewPage = () => {
  const router = useRouter()
  const userId = Number(router.query.userId as string)
  const id = router.query.id as string

  const { medicine } = useFetchReadMedicine({ userId: userId, medicineId: Number(id) })

  return (
    <>
      <PageHeader
        title='Medicamento'
        onBack={() =>
          router.push(
            `${bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.HEALTH_HISTORIC.path, {
              userId: userId,
            })}?tab=2`,
          )
        }
      />
      <Box>{!medicine ? <ViewSkeleton /> : <FormViewContainer medicine={medicine} />}</Box>
    </>
  )
}

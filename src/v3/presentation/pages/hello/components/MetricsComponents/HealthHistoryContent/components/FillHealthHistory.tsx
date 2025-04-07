import { Box, Skeleton, Typography } from '@mui/material'

import GradientChart from '@/components/Charts/GradientChart'
import { useFetchHealthHistoryFilled } from '@/v3/presentation/hooks/api/@v2/dashboard/useFetchHealthHistoryFilled'

export const FillHealthHistory = ({ institutionId }: { institutionId: number }) => {
  const { data: healthUnitFilled, isLoading } = useFetchHealthHistoryFilled({ institutionId })

  if (isLoading) return <Skeleton variant='rectangular' width='100%' height={'100%'} />

  const totalActivated = healthUnitFilled?.usersFilled || 0
  const totalUsers = healthUnitFilled.allUsers || 0
  const percent = healthUnitFilled.percent

  return (
    <>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        maxWidth={450}
        mx={'auto'}
        sx={{ cursor: 'pointer' }}
      >
        <Box flex={1} pl={'30px'}>
          <Typography variant={'h3'} fontWeight={700} mb={4}>
            Preenchimento de ficha de saúde
          </Typography>
          <Typography variant='body1' fontWeight={700} color='var(--mui-palette-grey-500)'>
            {totalActivated} usuários
          </Typography>
          <Typography variant='caption' fontWeight={400}>
            de um total de {totalUsers}
          </Typography>
        </Box>
        <Box width={[180, 200, 240]}>
          <GradientChart series={[percent]} />
        </Box>
      </Box>
    </>
  )
}

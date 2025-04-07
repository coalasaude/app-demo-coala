import { Box, Skeleton, Typography } from '@mui/material'

import Paper from '@/v3/presentation/components/Paper'
import GradientChart from '@/components/Charts/GradientChart'
import { useFetchActivateUsers } from '@/v3/presentation/hooks/api/@v2/dashboard/useFetchActivateUsers'

export const ActivationChart = ({
  institutionId,
  isMobile,
}: {
  institutionId: number
  isMobile: boolean
}) => {
  const { data: activatedUsers, isLoading } = useFetchActivateUsers({ institutionId })

  if (isLoading) return <Skeleton variant='rectangular' width='100%' height={'100%'} />

  const title = 'Usuários que realizaram ativação da conta'
  const totalActivated = activatedUsers?.usersActivated || 0
  const totalUsers = activatedUsers.allUsers || 0
  const percent = activatedUsers.percent

  return (
    <>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: ['row-reverse', 'column'],
          alignItems: 'center',
          justifyContent: 'space-between',
          height: ['172px', '100%'],
          px: [3, 0],
          gap: [2, 0],
        }}
      >
        <Box mx={[-9, 0]}>
          <GradientChart series={[percent]} />
        </Box>
        <Box flex={1} pl={[0, '30px']} pr={[0, '20px']} minWidth={160}>
          <Typography variant={isMobile ? 'h3' : 'h2'} fontWeight={700} mb={[3, 4]}>
            {title}
          </Typography>
          <Typography variant='body1' fontWeight={700} color='var(--mui-palette-grey-500)'>
            {totalActivated} usuários
          </Typography>
          <Typography variant='caption' fontWeight={400}>
            de um total de {totalUsers}
          </Typography>
        </Box>
      </Paper>
    </>
  )
}

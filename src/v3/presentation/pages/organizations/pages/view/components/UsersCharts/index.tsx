import React from 'react'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'

import { useFetchActivateUsers } from '@/v3/presentation/hooks/api/@v2/dashboard/useFetchActivateUsers'
import { useFetchHealthHistoryFilled } from '@/v3/presentation/hooks/api/@v2/dashboard/useFetchHealthHistoryFilled'
import { target } from '@/v3/presentation/newComponents/atoms/CJoyride/constants'

import BaseUsersCharts from './components/BaseUsersCharts'

export const UsersCharts = () => {
  const router = useRouter()
  const institutionId = { institutionId: Number(router.query.id) }
  const { data: activatedUsers } = useFetchActivateUsers(institutionId)
  const { data: healthUnitFilled } = useFetchHealthHistoryFilled(institutionId)

  return (
    <>
      <Grid item xl={6} lg={6} md={6} xs={12} id={target.coalaActivatedUsers}>
        <BaseUsersCharts
          title='Usuários que realizaram ativação da conta'
          percent={[activatedUsers.percent]}
          totalActivated={activatedUsers.usersActivated}
          totalUsers={activatedUsers.allUsers}
          institutionId={institutionId.institutionId}
          hasButton
        />
      </Grid>
      <Grid item xl={6} lg={6} md={6} xs={12} id={target.coalaHealthUnitFilled}>
        <BaseUsersCharts
          title='Preenchimento de ficha de saúde'
          percent={[healthUnitFilled.percent]}
          totalActivated={healthUnitFilled.usersFilled}
          totalUsers={healthUnitFilled.allUsers}
          institutionId={institutionId.institutionId}
          descriptionTooltip='Consideramos como preenchimento a conclusão do fluxo inicial de preenchimento da ficha de saúde.'
        />
      </Grid>
    </>
  )
}

export default UsersCharts

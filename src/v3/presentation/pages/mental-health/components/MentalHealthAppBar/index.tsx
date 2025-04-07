import { FC, ReactNode } from 'react'
import Router from 'next/router'

import { CDivider } from '@/v3/presentation/newComponents'
import { Tab, Tabs } from '@/v3/presentation/components/Tabs'
import { NEW_ROUTES } from '@/constants/routes'
import { PageHeader } from '@/v3/presentation/newComponents'

import Paper from '../../../../components/Paper'
import { useMentalHealthContext } from '../../contexts/mental-health.provider'

export interface MentalHealthAppBarProps {
  children?: ReactNode
}

const MentalHealthAppBar: FC<MentalHealthAppBarProps> = () => {
  const { userViewConfig, activeTab, handleTabChange } = useMentalHealthContext()

  return (
    <Paper p={1}>
      <PageHeader
        title='Saúde mental'
        actionButtonProps={{
          children: 'Criar sessão',
          onClick: () => Router.push(NEW_ROUTES.AUTHENTICATED.MENTAL_HEALTH.CREATE.path),
        }}
      />
      {userViewConfig?.tabs && userViewConfig?.tabs.length > 1 && (
        <>
          <Tabs
            value={activeTab}
            onChange={(e, value) => {
              handleTabChange?.(value)
            }}
          >
            {userViewConfig?.tabs.map(({ label }, index) => (
              <Tab key={label} value={index} label={label} sx={{ padding: '0 16px' }} />
            ))}
          </Tabs>
          <CDivider />
        </>
      )}
    </Paper>
  )
}

export default MentalHealthAppBar

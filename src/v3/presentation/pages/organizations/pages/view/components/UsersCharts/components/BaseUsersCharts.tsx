import React from 'react'
import { Box, Typography } from '@mui/material'
import { OpenInNew } from '@mui/icons-material'

import ChartsCard from '@/components/Template/AuthTemplate/Charts/ChartsCard'
import GradientChart from '@/components/Charts/GradientChart'
import useMediaQuery from '@/hooks/useMediaQuery'
import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { WebViewManager } from '@/services/WebView'
import { CTooltip } from '@/v3/presentation/newComponents'

import { StyledChartsCard } from '../../styles'

type Props = {
  title: string
  totalUsers: number
  totalActivated: number
  percent: number[]
  institutionId: number
  hasButton?: boolean
  descriptionTooltip?: string
}

export const BaseUsersCharts = ({
  percent,
  title,
  totalActivated,
  totalUsers,
  institutionId,
  hasButton = false,
  descriptionTooltip,
}: Props) => {
  const isSmallDevice = useMediaQuery('sm')

  const navigateToUserListRouter = (id?: number) =>
    WebViewManager.open(
      bindPathParams(
        `${NEW_ROUTES.AUTHENTICATED.USERS.LIST.path}?institutionId=[id]&status=[status]`,
        {
          id: String(id),
          status: 'ACTIVE',
        }
      ),
      '_blank'
    )

  return (
    <StyledChartsCard>
      <ChartsCard
        title=''
        {...(hasButton && {
          Icon: OpenInNew,
          onClick: () => navigateToUserListRouter(institutionId),
        })}
      >
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Box flex={1} p={[, , 2, 2]}>
            {descriptionTooltip ? (
              <CTooltip description={descriptionTooltip} placement='top'>
                <Typography variant={isSmallDevice ? 'h4' : 'h2'} fontWeight={700} mb={4}>
                  {title}
                </Typography>
              </CTooltip>
            ) : (
              <Typography variant={isSmallDevice ? 'h4' : 'h2'} fontWeight={700} mb={4}>
                {title}
              </Typography>
            )}
            <Typography variant='body1' fontWeight={700} color='var(--mui-palette-grey-500)'>
              {totalActivated} usuários
            </Typography>
            <Typography variant='caption' fontWeight={400}>
              de um total de {totalUsers}
            </Typography>
          </Box>
          <Box>
            <GradientChart series={percent} />
          </Box>
        </Box>
      </ChartsCard>
    </StyledChartsCard>
  )
}

export default BaseUsersCharts

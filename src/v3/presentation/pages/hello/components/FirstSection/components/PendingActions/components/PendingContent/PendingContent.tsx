import { Box, Stack, Typography } from '@mui/material'
import Link from 'next/link'

import GeneralSelfSvg from '/public/assets/svg/PendingActions/self_general.svg'
import HealthSelfSvg from '/public/assets/svg/PendingActions/self_health.svg'
import GeneralDependent2Svg from '/public/assets/svg/PendingActions/dependent_2_data.svg'
import GeneralDependent1Svg from '/public/assets/svg/PendingActions/dependent_1_data.svg'
import HealthDependent1Svg from '/public/assets/svg/PendingActions/dependent_1_health.svg'
import HealthDependent2Svg from '/public/assets/svg/PendingActions/dependent_2_health.svg'

import { PENDING_ACTIONS_SUB_TYPES, PENDING_ACTIONS_TYPES } from '@/types/pendingActionsTypes'
import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { CTooltipText } from '@/v3/presentation/newComponents/molecules/CTooltipText'

export const getPendingStepMap = (name?: string) => ({
  [PENDING_ACTIONS_TYPES.GENERAL_DATA]: {
    route: NEW_ROUTES.AUTHENTICATED.USERS.VIEW.bindPath,
    subTypes: {
      [PENDING_ACTIONS_SUB_TYPES.DEPENDENT_1]: {
        svg: GeneralDependent1Svg,
        text: `Complete os dados do(a) ${name}`,
      },
      [PENDING_ACTIONS_SUB_TYPES.DEPENDENT_2]: {
        svg: GeneralDependent2Svg,
        text: `Complete os dados do(a) ${name}`,
      },
      [PENDING_ACTIONS_SUB_TYPES.SELF]: {
        svg: GeneralSelfSvg,
        text: 'Complete os seus dados',
      },
    },
  },
  [PENDING_ACTIONS_TYPES.HEALTH_HISTORY]: {
    route: NEW_ROUTES.AUTHENTICATED.HEALTH_HISTORY.path,
    subTypes: {
      [PENDING_ACTIONS_SUB_TYPES.DEPENDENT_1]: {
        svg: HealthDependent1Svg,
        text: `Preencha a ficha de saúde do(a) ${name}`,
      },
      [PENDING_ACTIONS_SUB_TYPES.DEPENDENT_2]: {
        svg: HealthDependent2Svg,
        text: `Preencha a ficha de saúde do(a) ${name}`,
      },
      [PENDING_ACTIONS_SUB_TYPES.SELF]: {
        svg: HealthSelfSvg,
        text: 'Preencha sua ficha de saúde',
      },
    },
  },
})

type IPendingStep = {
  type: keyof typeof PENDING_ACTIONS_TYPES
  subType: keyof typeof PENDING_ACTIONS_SUB_TYPES
  name: string
  userId: number
}

export const PendingContent = ({ subType, type, userId, name }: IPendingStep) => {
  const pendingStepMap = getPendingStepMap(name)
  const Svg = pendingStepMap[type].subTypes[subType].svg

  return (
    <Link
      href={bindPathParams(pendingStepMap[type].route, { userId: userId })}
      style={{ width: '100%', height: '100%' }}
    >
      <Box
        display='flex'
        flexDirection={['column', 'row']}
        height={'100%'}
        minHeight={64}
        minWidth={160}
        maxWidth={[160, '100%']}
        alignItems={['flex-start', 'center']}
        gap={1.5}
        py={1}
        px={2}
        borderRadius={1}
        bgcolor={'white'}
        sx={{
          cursor: 'pointer',
          '&:hover': {
            opacity: 0.8,
          },
          '&:active': {
            opacity: 0.6,
          },
        }}
      >
        <Stack
          borderRadius={1}
          bgcolor={'var(--mui-palette-common-white)'}
          width={40}
          height={40}
          alignItems='center'
          justifyContent='center'
        >
          <Svg />
        </Stack>
        <CTooltipText>
          <Typography
            color='var(--mui-palette-primary-dark)'
            variant='body1'
            whiteSpace='initial'
            overflow='hidden'
            textOverflow='ellipsis'
            display='-webkit-box'
            sx={{ WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
          >
            {pendingStepMap[type].subTypes[subType].text}
          </Typography>
        </CTooltipText>
      </Box>
    </Link>
  )
}

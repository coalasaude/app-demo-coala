import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import { Box, Skeleton, Stack, Typography } from '@mui/material'

import { ApiPendingActionsResponse } from '@/v3/domain/api/ApiPendingActionsResponse'

import { PendingContent } from '../PendingContent'
import { PendingEmpty } from '../PendingEmpty/PendingEmpty'

export const PendingSection = ({
  pendingActions,
  isLoadingPendingActions,
}: {
  pendingActions?: ApiPendingActionsResponse
  isLoadingPendingActions: boolean
}) => {
  return (
    <Box
      p={'20px'}
      borderRadius={2}
      bgcolor={'var(--mui-palette-grey-100)'}
      width='100%'
      flex={1}
      minHeight={192}
    >
      <Stack spacing={1} direction='row' alignItems='center'>
        <Stack
          sx={{
            backgroundColor: 'var(--mui-palette-secondary-main)',
            width: 22,
            height: 22,
            borderRadius: '50%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FlagOutlinedIcon sx={{ color: 'var(--mui-palette-common-white)', fontSize: 16 }} />
        </Stack>
        <Typography variant='h4'>Seus próximos passos</Typography>
      </Stack>

      <Typography variant='body1' mt={1} mb={3}>
        Realize as seguintes tarefas para que seu atendimento seja mais rápido e personalizado;
      </Typography>

      {isLoadingPendingActions ? (
        <Skeleton variant='rectangular' height={64} />
      ) : (
        <Box
          display={['flex', 'grid']}
          gap={2}
          flexDirection='row'
          overflow='auto'
          gridTemplateRows={'1fr'}
          gridTemplateColumns={Array.from(
            {
              length:
                pendingActions && pendingActions.length > 0
                  ? Math.max(3, pendingActions?.length || 0)
                  : 0,
            },
            () => '1fr',
          ).join(' ')}
        >
          {pendingActions &&
            pendingActions?.length > 0 &&
            pendingActions
              ?.slice(0, 3)
              .map((pendingAction) => (
                <PendingContent
                  key={pendingAction.userId}
                  userId={pendingAction.userId}
                  name={pendingAction.userName}
                  type={pendingAction.type}
                  subType={pendingAction.subType}
                />
              ))}
          {(!pendingActions || pendingActions?.length === 0) && <PendingEmpty />}
        </Box>
      )}
    </Box>
  )
}

import { Box, Skeleton, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { NotFound } from '@/v3/presentation/components/NotFound'
import { useFetchLastHealthHistoryList } from '@/v3/presentation/hooks/api/@v2/dashboard/useFetchLastHealthHistoryList'
import { CButton } from '@/v3/presentation/newComponents'

export const LastHealthHistoryTable = ({ institutionId }: { institutionId: number }) => {
  const router = useRouter()
  const { data: list, isLoading } = useFetchLastHealthHistoryList({ institutionId })

  if (isLoading) return <Skeleton variant='rectangular' width='100%' height={'100%'} />

  return (
    <>
      <Box>
        <Box
          p={2}
          pt='20px'
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography variant={'h4'} fontWeight={700}>
              Ficha de saúde
            </Typography>
            <Typography variant={'body2'} whiteSpace={'pre-line'}>
              Usuários que fizeram as últimas atualizações
            </Typography>
          </Box>
          <CButton
            variant='secondary'
            onClick={() =>
              router.push(
                bindPathParams(NEW_ROUTES.AUTHENTICATED.ORGANIZATION.INSTITUTION.REPORTS.path, {
                  id: institutionId,
                }),
              )
            }
          >
            Gerar relatório
          </CButton>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: '36px',
            justifyContent: 'space-between',
            height: '46px',
            backgroundColor: 'var(--mui-palette-grey-100)',
            borderBottom: '1px solid var(--mui-palette-grey-200)',
          }}
        >
          <Typography variant={'body2'}>Nome</Typography>
          <Typography variant={'body2'}>Data e hora</Typography>
        </Box>
        {list?.map((item, index) => (
          <Box
            key={index}
            onClick={() => {
              router.push(
                bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.VIEW.bindPath, { userId: item.id }),
              )
            }}
            sx={{
              cursor: 'pointer',
              ':hover': {
                backgroundColor: 'var(--mui-palette-grey-100)',
              },
              display: 'flex',
              px: '36px',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '46px',
              borderBottom: '1px solid var(--mui-palette-grey-200)',
            }}
          >
            <Typography fontWeight={700} variant={'body2'}>
              {item.name}
            </Typography>
            <Typography whiteSpace={'pre-line'} variant={'body2'}>
              {item.date}
            </Typography>
          </Box>
        ))}
        {list?.length === 0 && (
          <Box m={1}>
            <NotFound text='Nenhuma ficha de saúde encontrada' />
          </Box>
        )}
      </Box>
    </>
  )
}

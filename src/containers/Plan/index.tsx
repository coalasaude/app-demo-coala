import { Table, TableBody, TableCell, TableContainer, TableHead, Typography } from '@mui/material'
import Router from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import { NotFound } from '@/components/NotFound'
import { ListSkeleton } from '@/components/Skeletons'
import { limit } from '@/constants/api'
import { IntervalTimes } from '@/constants/interval'
import { AUTHENTICATED_ROUTES, ROUTES } from '@/constants/routes'
import { SubscriptionStatusDescription } from '@/constants/subscriptionStatus'
import { useLazyFetch } from '@/hooks/useFetch'
import { Plan } from '@/types/plan'
import { IListResponse } from '@/types/request'
import { Subscription } from '@/types/subscription'
import Paper from '@/v3/presentation/components/Paper'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { PageHeader } from '@/v3/presentation/newComponents'
import { CTableRow } from '@/v3/presentation/newComponents/atoms/CTableRow/CTableRow'
import CPagination from '@/v3/presentation/newComponents/molecules/CPagination'

export const PlanList = () => {
  const [apiRequest, { data }] = useLazyFetch<IListResponse<Plan>>()
  const [api] = useLazyFetch<Subscription>()
  const [subscription, setSubscription] = useState<Subscription>()
  const { auth } = useAuth()

  const getPlans = useCallback(
    async (limit: number, offset: number) => {
      await apiRequest({
        path: 'plan',
        method: 'GET',
        queryParams: {
          limit,
          offset,
        },
      })
    },
    [apiRequest]
  )

  const getSubscription = useCallback(async () => {
    if (!auth?.user?.id) {
      return
    }

    const { id } = auth?.user
    const { data } = await api({
      path: `subscription/:id`,
      method: 'GET',
      pathParams: {
        id,
      },
    })

    if (data) {
      setSubscription(data)
    }
  }, [api, auth.user])

  useEffect(() => {
    getPlans(limit, 0)
    getSubscription()
  }, [getPlans, getSubscription])

  if (data === undefined) {
    return <ListSkeleton />
  }

  return (
    <>
      <PageHeader
        title='Planos disponíveis'
      />
      <Paper p={0}>
        {data?.results.length > 0 && (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <CTableRow>
                    <TableCell>Produto</TableCell>
                    <TableCell>Valor</TableCell>
                    <TableCell>Período</TableCell>
                    <TableCell>Status</TableCell>
                  </CTableRow>
                </TableHead>
                <TableBody>
                  {data.results.map(({ id, product_name, amount, interval }) => {
                    return (
                      <CTableRow
                        key={id}
                        onClick={() =>
                          Router.push(`${ROUTES.MODULES.APP}${AUTHENTICATED_ROUTES.PLAN}/${id}`)
                        }
                      >
                        <TableCell>
                          <Typography>{product_name}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography component='span' display='block'>
                            R$ {amount / 100}
                          </Typography>
                        </TableCell>
                        <TableCell>{IntervalTimes[interval]}</TableCell>
                        <TableCell>
                          <Typography component='span' display='block'>
                            {subscription?.status && subscription.plan_id === Number(id)
                              ? SubscriptionStatusDescription[subscription?.status]
                              : 'Sem assinatura'}
                          </Typography>
                        </TableCell>
                      </CTableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <CPagination
              totalCount={data.count}
              count={Math.ceil(data.count / limit)}
              onChange={(e, page) => {
                getPlans(limit, limit * (page - 1))
              }}
            />
          </>
        )}
        {data?.results?.length < 1 && <NotFound />}
      </Paper>
    </>
  )
}

export default PlanList

import Router from 'next/router'
import { Box } from '@mui/system'
import { Table, TableBody, TableContainer, TableCell, TableHead } from '@mui/material'

import { CTableRow } from '@/v3/presentation/newComponents/atoms/CTableRow/CTableRow'
import { AUTHENTICATED_ROUTES, ROUTES } from '@/constants/routes'
import { NotFound } from '@/components/NotFound'
import { IListResponse } from '@/types/request'
import { Plan } from '@/types/plan'
import Paper from '@/v3/presentation/components/Paper'
import { PageHeader } from '@/v3/presentation/newComponents'

export const PlanPermissionListDesktop = ({
  data,
  IntervalTimes,
}: {
  data: IListResponse<Plan>
  IntervalTimes: {
    DAY: string
    WEEK: string
    MONTH: string
    YEAR: string
  }
}) => {
  return (
    <>
      <PageHeader title='Planos e suas permissões' />
      <Paper p={0}>
        {data?.results?.length > 0 && (
          <TableContainer>
            <Table>
              <TableHead>
                <CTableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Intervalo</TableCell>
                </CTableRow>
              </TableHead>
              <TableBody>
                {data?.results?.map(({ id, product_name, interval }) => {
                  return (
                    <CTableRow
                      key={id}
                      onClick={() =>
                        Router.push(
                          `${ROUTES.MODULES.APP}${AUTHENTICATED_ROUTES.PLAN_PERMISSION}/${id}`,
                        )
                      }
                    >
                      <TableCell>{product_name}</TableCell>
                      <TableCell>{IntervalTimes[interval]}</TableCell>
                    </CTableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {data?.results?.length < 1 && (
          <Box mt={3}>
            <NotFound />
          </Box>
        )}
      </Paper>
    </>
  )
}

export default PlanPermissionListDesktop

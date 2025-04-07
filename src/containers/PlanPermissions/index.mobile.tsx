import Router from 'next/router'
import { Box } from '@mui/system'

import { capitalizeName } from '@/utils/capitalizeName'
import { AUTHENTICATED_ROUTES, ROUTES } from '@/constants/routes'
import { NotFound } from '@/components/NotFound'
import { SmallDeviceCard } from '@/components/Template/Mobile/AuthTemplate/Cards'
import { IListResponse } from '@/types/request'
import { Plan } from '@/types/plan'
import { MobileContent } from '@/components/Template/Mobile/AuthTemplate/Content'
import { PageHeader } from '@/v3/presentation/newComponents'
import CChip from '@/v3/presentation/newComponents/atoms/CChip'

export const PlanPermissionListMobile = ({
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
      <MobileContent>
        <Box mt={2}>
          {data?.results.map(({ id, product_name, interval }) => {
            return (
              <SmallDeviceCard
                key={id}
                onClick={() =>
                  Router.push(`${ROUTES.MODULES.APP}${AUTHENTICATED_ROUTES.PLAN_PERMISSION}/${id}`)
                }
              >
                <SmallDeviceCard.Wrapper>
                  <SmallDeviceCard.Content>
                    <div>
                      <SmallDeviceCard.Title>{capitalizeName(product_name)}</SmallDeviceCard.Title>
                    </div>
                  </SmallDeviceCard.Content>
                  <CChip label={IntervalTimes[interval]} variant='outlined' size='small' />
                </SmallDeviceCard.Wrapper>
              </SmallDeviceCard>
            )
          })}
          {data?.results?.length < 1 && (
            <Box mt={3}>
              <NotFound />
            </Box>
          )}
        </Box>
      </MobileContent>
    </>
  )
}

export default PlanPermissionListMobile

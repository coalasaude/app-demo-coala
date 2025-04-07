import { FC, ReactNode, createContext, useContext, useMemo } from 'react'

import { Indication } from '@/v3/domain/Indication'
import { useFetchIndicationList } from '@/v3/presentation/hooks/useFetchIndicationList'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { useFetchIndicationRaking } from '@/v3/presentation/hooks/useFetchIndicationRanking'
import { User } from '@/v3/domain/User'
import { useFetchIndicationRedeem } from '@/v3/presentation/hooks/useFetchIndicationRedeem'
import { IndicationApiFilter, TApiIndicationCountResponse } from '@/v3/infra/services/indication'
import { useFetchIndicationCount } from '@/v3/presentation/hooks/useFetchIndicationCount'

export interface IndicationContextData {
  isAdmin: boolean
  indications: Indication[]
  redeems: Indication[]
  indicationRanking: {
    count: number
    user: User
  }[]
  indicationListFilter: IndicationApiFilter
  setIndicationListFilter: (filter: IndicationApiFilter) => void
  redeemFilter: IndicationApiFilter
  setRedeemFilter: (filter: IndicationApiFilter) => void
  indicationCount: TApiIndicationCountResponse
}

const indicationContext = createContext<IndicationContextData>({
  isAdmin: false,
  indications: [],
  indicationRanking: [],
  redeems: [],
  indicationListFilter: {},
  setIndicationListFilter: () => {
    /* do nothing */
  },
  redeemFilter: {},
  setRedeemFilter: () => {
    /* do nothing */
  },
  indicationCount: {
    available: 0,
    redeemed: 0,
    valid: 0,
  },
})

export const IndicationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const {
    data: indicationList,
    filter: indicationListFilter,
    setFilter: setIndicationListFilter,
  } = useFetchIndicationList()
  const { data: indicationRanking } = useFetchIndicationRaking()
  const {
    data: indicationRedeem,
    filter: redeemFilter,
    setFilter: setRedeemFilter,
  } = useFetchIndicationRedeem()
  const { auth } = useAuth()
  const isAdmin = !!auth.user?.isAdmin
  const { data: indicationCount } = useFetchIndicationCount()

  const state: IndicationContextData = useMemo(
    () => ({
      isAdmin,
      indications: indicationList,
      indicationRanking,
      redeems: indicationRedeem,
      indicationListFilter,
      setIndicationListFilter,
      redeemFilter,
      setRedeemFilter,
      indicationCount,
    }),
    [
      indicationCount,
      indicationList,
      indicationListFilter,
      indicationRanking,
      indicationRedeem,
      isAdmin,
      redeemFilter,
      setIndicationListFilter,
      setRedeemFilter,
    ]
  )

  return <indicationContext.Provider value={state}>{children}</indicationContext.Provider>
}

export const useIndicationContext = () => useContext(indicationContext)

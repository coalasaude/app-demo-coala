import React, { useEffect, useState } from 'react'

import { eventBus, EventBusEnum } from '@/v3/utils/event-bus'

export interface IPermissionsContext {
  reload: number
}

const FeatureFlagContext = React.createContext<IPermissionsContext>({} as IPermissionsContext)

export const FeatureFlagProvider = ({ children }: { children: React.ReactNode }) => {
  const [reload, setUpdate] = useState(0)

  useEffect(() => {
    eventBus.on(EventBusEnum.FEATURE_FLAG_LOAD, () => {
      setUpdate((prev) => prev + 1)
    })

    return () => {
      eventBus.off(EventBusEnum.FEATURE_FLAG_LOAD, () => setUpdate((prev) => prev + 1))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <FeatureFlagContext.Provider value={{ reload }}>{children}</FeatureFlagContext.Provider>
}

export const useFeatureFlagContext = () => React.useContext(FeatureFlagContext)

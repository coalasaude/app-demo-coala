import React, { createContext, Dispatch, SetStateAction, useState } from 'react'

import { PageSpinner } from '@/components/Spinner'

interface IRequestProvider {
  requestCounter: number
  setRequestCounter: Dispatch<SetStateAction<number>>
}
export const RequestContext = createContext<IRequestProvider>({} as IRequestProvider)

export const RequestProvider = ({ children }: { children: React.ReactNode }) => {
  const [requestCounter, setRequestCounter] = useState(0)
  return (
    <RequestContext.Provider value={{ setRequestCounter, requestCounter }}>
      <PageSpinner isVisible={requestCounter > 0} />
      {children}
    </RequestContext.Provider>
  )
}

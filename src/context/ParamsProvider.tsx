import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'

interface IParamsProvider {
  params: any
  setParams: Dispatch<SetStateAction<any>>
}
export const ParamsContext = createContext<IParamsProvider>({} as IParamsProvider)

/**
 * Send params throug the app when using router. After 2 pathname changes, the state is clear by default.
 * @returns {number} setParams, params
 */
export const ParamsProvider = ({ children }: { children: React.ReactNode }) => {
  const [params, setParams] = useState({})
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pagesCounter, setPagesCounter] = useState(0)

  useEffect(() => {
    const keys = Object.keys(params)
    if (keys.length > 0) setPagesCounter(2)
  }, [params])

  return <ParamsContext.Provider value={{ setParams, params }}>{children}</ParamsContext.Provider>
}

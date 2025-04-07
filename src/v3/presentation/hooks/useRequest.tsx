import { useContext } from 'react'

import { RequestContext } from '@/context/RequestProvider'

export const useRequest = () => {
  return useContext(RequestContext)
}

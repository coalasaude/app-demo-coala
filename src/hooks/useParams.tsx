import { useContext } from 'react'

import { ParamsContext } from '@/context/ParamsProvider'

export const useParams = () => {
  return useContext(ParamsContext)
}

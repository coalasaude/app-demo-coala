import { useContext } from 'react'

import { LayoutContext } from '@/context/LayoutProvider'

export const useLayout = () => {
  return useContext(LayoutContext)
}

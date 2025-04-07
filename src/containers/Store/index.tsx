import Router from 'next/router'

import { useStoreRedirect } from '@/v3/presentation/hooks/useStoreRedirect'

export const Store = () => {
  const { onGoToStore } = useStoreRedirect()

  onGoToStore({ fallBack: () => Router.push('/') })

  return null
}

export default Store

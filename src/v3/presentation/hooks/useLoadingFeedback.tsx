import { useCallback, useState } from "react"


export const useLoadingFeedback = (callback: () => Promise<void>) => {
  const [isLoading, setIsLoading] = useState(false)

  const execute = useCallback(async () => {
    setIsLoading(true)
    callback().finally(() => setIsLoading(false))
  }, [callback])

  return { isLoading, setIsLoading, execute }
}
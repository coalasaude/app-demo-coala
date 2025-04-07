import { RefObject, useEffect, useState } from 'react'

export function useIsTextTruncated(ref: RefObject<HTMLElement>): boolean {
  const [isTruncated, setIsTruncated] = useState(false)

  useEffect(() => {
    if (ref.current) {
      const isTextTruncated = ref.current.scrollHeight > ref.current.clientHeight
      setIsTruncated(isTextTruncated)
    }
  }, [ref])

  return isTruncated
}

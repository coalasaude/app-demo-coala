import { Tooltip } from '@mui/material'
import React, { useRef } from 'react'

import { useIsTextTruncated } from '@/v3/presentation/hooks/useIsTextTruncated'

export type CTooltipProps = {
  children: React.ReactElement<any, any>
  placement?: 'bottom' | 'right' | 'left' | 'top'
}

export const CTooltipText = ({ children, placement = 'bottom' }: CTooltipProps) => {
  const textRef = useRef<HTMLDivElement | null>(null)
  const isTruncated = useIsTextTruncated(textRef)

  const newChildren = React.cloneElement(children, {
    ref: textRef,
  })

  return (
    <>
      {isTruncated ? (
        <Tooltip
          title={textRef.current?.textContent}
          placement={placement}
          arrow
          enterTouchDelay={0}
        >
          <div>{newChildren}</div>
        </Tooltip>
      ) : (
        newChildren
      )}
    </>
  )
}

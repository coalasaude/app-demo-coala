import React from 'react'

import { CCardBase, CCardBaseProps } from '../../newComponents'

export const CardContent = ({
  children,
  ...props
}: { children: React.ReactNode; hover?: boolean } & CCardBaseProps) => {
  return (
    <CCardBase
      {...props}
      sx={{
        display: 'block',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        paddingX: 1,
        paddingY: 1,
        width: '100%',
        ...props.sx,
      }}
    >
      {children}
    </CCardBase>
  )
}

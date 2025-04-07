import React, { useState } from 'react'

import { NotificationItem } from './styles'

export const Item: React.FC<{ children: React.ReactNode; onRemove: (...params: any) => any }> = ({
  children,
  onRemove,
}) => {
  const [isViewed, setIsViewed] = useState(false)
  return (
    <NotificationItem
      onClick={() => {
        setIsViewed(true)
        onRemove()
      }}
      isViewed={isViewed}
    >
      {children}
    </NotificationItem>
  )
}

export default Item

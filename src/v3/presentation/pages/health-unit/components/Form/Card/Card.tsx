import { CContainerContent } from '@/v3/presentation/newComponents'

import { Content } from './styles'

type CardProps = {
  title: string
  children: React.ReactNode[] | React.ReactNode
  noBorder?: boolean
}

export const Card = ({ title, children, noBorder }: CardProps) => {
  return (
    <CContainerContent title={title} noBorder={noBorder}>
      <Content>{children}</Content>
    </CContainerContent>
  )
}

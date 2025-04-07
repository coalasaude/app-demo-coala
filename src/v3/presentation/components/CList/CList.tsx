import { CListItem } from '../CListItem'

import { Container } from './styles'

type CListProps = {
  items: string[]
  deleteButton?: boolean

  onClick?: () => void
  onDelete?: () => void
}

export const CList = ({ items, ...props }: CListProps) => {
  return (
    <Container>
      {Array.isArray(items) &&
        items?.map((item) => <CListItem key={item} content={item} {...props} />)}
    </Container>
  )
}

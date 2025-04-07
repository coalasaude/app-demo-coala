import { FilterList } from '@mui/icons-material'
import { Button } from '@mui/material'

type CFilterIconProps = {
  onClick: () => void
}

export const CFilterIcon = ({ onClick }: CFilterIconProps) => {
  return (
    <Button variant='text' onClick={onClick} size='medium'>
      <FilterList />
    </Button>
  )
}

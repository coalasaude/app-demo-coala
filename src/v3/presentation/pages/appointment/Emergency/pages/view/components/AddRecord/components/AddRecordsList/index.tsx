import { Stack } from '@mui/material'

import { CMenuPanel } from '@/v3/presentation/newComponents/molecules/CMenuPanel/CMenuPanel'

export interface TMenuRecordsIcon {
  id: string
  label: string
  icon: React.ReactNode
}

interface RecordsListProps {
  menuRecords: TMenuRecordsIcon[]
  selected?: string
  direction?: 'row' | 'column'

  onSelect: (label: string) => void
}

export const AddRecordsList = ({
  menuRecords,
  selected,
  onSelect,
  direction,
}: RecordsListProps) => {
  const type = direction === 'row' ? 'small' : 'large'

  return (
    <Stack
      minWidth={268}
      direction={direction}
      gap={direction === 'row' ? 1 : 0}
      height='100%'
      sx={(theme) => ({ [theme.breakpoints.down('sm')]: { width: '100%' } })}
    >
      {menuRecords.map((item) => (
        <CMenuPanel
          key={item.label}
          type={type}
          label={item.label}
          icon={item.icon}
          onClick={() => onSelect(item.id)}
          isSelected={selected === item.id}
        />
      ))}
    </Stack>
  )
}

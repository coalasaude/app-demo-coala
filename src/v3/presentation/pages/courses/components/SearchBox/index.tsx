import { CInput } from '@/v3/presentation/newComponents'

interface SearchBoxProps {
  onChange: (value: string) => void
  value: string
}

export const SearchBox = ({ onChange, value }: SearchBoxProps) => {
  return (
    <CInput
      name='queryFilter'
      placeholder='Buscar curso'
      label='Buscar curso'
      onChange={(e) => onChange(e.target.value)}
      value={value}
      inputType='search'
      sx={{
        width: ['100%', '40%'],
      }}
    />
  )
}

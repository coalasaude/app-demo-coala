import { EXPERIMENTAL_SearchInput } from '@/v3/presentation/components/EXPERIMENTAL_SearchInput'

interface PeiPdiAnalysisFilterProps {
  onSearch: (name: string) => void
  defaultValue?: string
}

const PeiPdiAnalysisFilter = ({ onSearch, defaultValue }: PeiPdiAnalysisFilterProps) => {
  return (
    <EXPERIMENTAL_SearchInput
      onSearch={onSearch}
      placeholder='Nome do aluno ou colaborador responsável'
      sx={{ width: [undefined, '30%'], maxWidth: undefined, mb: 2 }}
      data-testid='searchInputName'
      defaultValue={defaultValue}
    />
  )
}

export default PeiPdiAnalysisFilter

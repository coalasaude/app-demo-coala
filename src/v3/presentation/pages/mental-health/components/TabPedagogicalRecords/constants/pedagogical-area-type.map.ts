import { InterestAreaCategory } from '@/v3/domain/@v2/mental-health/enums/pedagogical-area-type.enum'

type ContentMapType = Record<InterestAreaCategory, { label: string }>

export const PedagogicalAreaTypeMap: ContentMapType = {
  [InterestAreaCategory.ACADEMIC]: {
    label: 'Acadêmico',
  },
  [InterestAreaCategory.EXTRACURRICULAR]: {
    label: 'Extracurricular',
  },
  [InterestAreaCategory.OTHERS]: {
    label: 'Outros',
  },
}

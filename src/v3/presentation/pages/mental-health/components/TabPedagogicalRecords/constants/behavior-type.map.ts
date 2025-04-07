import { BehaviorType } from '@/v3/domain/@v2/mental-health/enums/behavior-type.enum'

type ContentMapType = Record<BehaviorType, { label: string }>

export const BehaviorTypeMap: ContentMapType = {
  [BehaviorType.CHALLENGING]: {
    label: 'Desafiador',
  },
  [BehaviorType.EMOTIONAL]: {
    label: 'Emocional',
  },
}

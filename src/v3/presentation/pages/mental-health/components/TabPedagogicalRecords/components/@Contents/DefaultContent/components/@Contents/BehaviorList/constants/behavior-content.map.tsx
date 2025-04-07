import { BehaviorType } from '@/v3/domain/@v2/mental-health/enums/behavior-type.enum'

import { ChallengingCard } from '../components/ChallengingCard'
import { EmotionalCard } from '../components/EmotionalCard'
import { BehaviorContentProps } from '../types/behavior-content.type'

type ContentMapType = Record<
  BehaviorType,
  { component: (props: BehaviorContentProps) => JSX.Element }
>

export const BehaviorContentMap: ContentMapType = {
  [BehaviorType.EMOTIONAL]: {
    component: (props) => <EmotionalCard {...props} />,
  },
  [BehaviorType.CHALLENGING]: {
    component: (props) => <ChallengingCard {...props} />,
  },
}

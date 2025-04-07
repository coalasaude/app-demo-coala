import { MentalHealthBehaviorResultBrowseModel } from '@/v3/domain/@v2/mental-health/registers/behavior/behavior-result-browse.model'

export type BehaviorContentProps = {
  model: MentalHealthBehaviorResultBrowseModel
  handleDelete: (id: number) => Promise<void>
  handleEdit: (id: number) => void
}

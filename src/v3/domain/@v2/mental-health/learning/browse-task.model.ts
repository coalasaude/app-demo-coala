import { MentalHealthTaskStatus } from '@/constants/mentalHealth'
import { DefaultStatus } from '@/types/status'

export type BrowseTaskConstructor = {
  id: number
  subCategoryName?: string
  categoryId?: number
  subCategoryId?: number
  objective?: string
  taskStatus?: MentalHealthTaskStatus
  status: DefaultStatus
  activities?: string
  adaptations?: string
  supportTechnologies?: string
  assessment?: string
}

export class BrowseTask {
  id: number
  subCategoryName?: string
  categoryId?: number
  subCategoryId?: number
  objective?: string
  taskStatus?: MentalHealthTaskStatus
  status?: DefaultStatus
  activities?: string
  adaptations?: string
  supportTechnologies?: string
  assessment?: string

  constructor(props: BrowseTaskConstructor) {
    this.id = props.id
    this.subCategoryName = props.subCategoryName
    this.categoryId = props.categoryId
    this.subCategoryId = props.subCategoryId
    this.objective = props.objective
    this.taskStatus = props.taskStatus
    this.status = props.status
    this.activities = props.activities
    this.adaptations = props.adaptations
    this.supportTechnologies = props.supportTechnologies
    this.assessment = props.assessment
  }
}
